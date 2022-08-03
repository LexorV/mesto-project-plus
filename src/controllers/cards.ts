import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((Card) => res.send({ Card }))
    .catch(next);
}
export const createCard = (req: any, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return Card.create({
    name: name,
    link: link,
    owner: req.user._id
  })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Неправильно заполнено поле');
      }
      else return next(err)
    })
    .catch(next);
}
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карты с указанным id');
      }
      res.send(card)
    })
    .catch(next);
}
export const likeCard = (req: any, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {
      $addToSet:
        { likes: req.user._id }
    },
    { new: true },
  )
    .then((card) => {
      res.send(card)
      if (!card) {
        throw new BadRequestError('Неправильный id');
      }
    })
    .catch(next);
}
export const dislikeCard = (req: any, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send(card)
      if (!card) {
        throw new BadRequestError('Неправильный id');
      }
    })
    .catch(next);
}