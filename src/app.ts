import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import { UNKNOWN_ERROR } from './constants/ErrorCode';
import { IError } from './types/errors';
import NotFoundError from './errors/notFoundError';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import {
  createUser,
  login,
} from './controllers/users';
import {
  getCards,
} from './controllers/cards';

const { PORT = 3000 } = process.env;
export interface SessionRequest extends Request {
  user?: {
    _id: string;
  }
}
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
app.use((req: SessionRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '62e807cfb4b44dff9df8d6aa',
  };

  next();
}); */
app.use(requestLogger);
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/cards', getCards);
app.use(auth);
app.all('/', () => {
  throw new NotFoundError('Запрашиваемые данные отсутствуют');
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);
app.use((
  err: IError,
  req: Request,
  res: Response,
) => {
  const { statusCode = UNKNOWN_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === UNKNOWN_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
