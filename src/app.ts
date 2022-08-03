import express, { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
const { PORT = 3000 } = process.env;
export interface SessionRequest extends Request {
  user?:{
    _id: string;
  }
}
interface IError {
  status?: number;
}
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req:SessionRequest, res:Response, next) => {
  req.user = {
    _id: '62e807cfb4b44dff9df8d6aa'
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((err:IError, req:Request, res:Response, next:RequestHandler) => {

  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})