import { Request, Response } from 'express';
import User from '../models/user';

export const getUser = (req: Request, res: Response) => {
  return User.find({})
    .then((user) => res.send({ user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name: name, about: about, avatar: avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500)
    .send({ message: `Произошла ошибка ${err}` }));
}
export const findUser = (req: Request, res: Response) => {

  User.findById(req.params.userId)
    .then((user) => res.send({ user: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const updateUser = (req: any, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    {
      name: name,
      about: about
    },
    {
      new: true,
      runValidators: true
    })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const updateAvatar = (req: any, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    {
      avatar: avatar
    },
    {
      new: true,
      runValidators: true
    })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

