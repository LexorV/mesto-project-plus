import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((card) => res.send(card))
  .catch(next);
export const createCard = (req: any, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Неправильно заполнено поле');
      }
      return next(err);
    })
    .then((card) => res.send({ card }))
    .catch(next);
};
export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndRemove(req.params.cardId)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Неправильный id карточки');
      }
      return next(err);
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карты с указанным id');
      }
      res.send(card);
    })
    .catch(next);
};
export const likeCard = (req: any, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet:
        { likes: req.user._id },
    },
    { new: true },
  )
    .then((card) => {
      res.send(card);
      if (!card) {
        throw new BadRequestError('Неправильный id');
      }
    })
    .catch(next);
};
export const dislikeCard = (req: any, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send(card);
      if (!card) {
        throw new BadRequestError('Неправильный id');
      }
    })
    .catch(next);
};
