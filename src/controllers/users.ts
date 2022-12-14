import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import RepeatedNameError from '../errors/repeatedNameError';
import { SessionRequest } from '../types/request';
import AutchErr from '../errors/autchErr';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((user) => res.send({ user }))
  .catch(next);
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        throw new RepeatedNameError('Такой Email уже зарегистрирован');
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err);
      }
      return next(err);
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
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Неправильный id');
      }
      return next(err);
    })

    .catch(next);
};
export const updateUser = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user?._id,
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
        throw new NotFoundError('Пользователя не существует');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Неправильный id');
      }
      return next(err);
    })
    .catch(next);
};
export const updateAvatar = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user?._id,
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
        throw new NotFoundError('Пользователя не существует');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Неправильный id');
      }
      return next(err);
    })
    .catch(next);
};
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AutchErr('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AutchErr('Неправильные почта или пароль');
        }
        return user;
      });
    })
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          'some-secret-key',
          { expiresIn: '7d' },
        ),
      });
    })
    .catch(next);
};

export const getUser = (req: SessionRequest, res: Response, next: NextFunction) => {
  User.findById(req.user?._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Неправильный id');
      }
      return next(err);
    })

    .catch(next);
};
