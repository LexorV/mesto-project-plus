import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
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
import { UrlPicture } from './constants/RegularConst';

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).pattern(/(?=.*[a-z])(?=.*[0-9])/)
      .message('Некоректный пароль'),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(UrlPicture).message('Некорректно указан url'),//eslint-disable-line
  }),
}), createUser);
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
  next: NextFunction,
) => {
  const { statusCode = UNKNOWN_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === UNKNOWN_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });
  next(message);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
