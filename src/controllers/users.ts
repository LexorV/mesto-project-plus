import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';

export const getUser = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((user) => res.send({ user }))
  .catch(next);
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Неправильный логин или пароль');
      } else return next(err);
    })
    .catch(next);
};
export const findUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })

    .catch(next);
};
export const updateUser = (req: any, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Пользователя не существует');
      }
      return res.send(user);
    })
    .catch(next);
};
export const updateAvatar = (req: any, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Пользователя не существует');
      }
      return res.send(user);
    })
    .catch(next);
};
