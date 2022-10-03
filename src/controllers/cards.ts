import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import DellError from '../errors/DellError';
import { SessionRequest } from '../types/request';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((card) => res.send(card))
  .catch(next);
export const createCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  return Card.create({
    name,
    link,
    owner: req.user?._id,
  })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Неправильно заполнено поле');
      }
      return next(err);
    });
};
export const deleteCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карты с указанным id');
      }
      if (String(card.owner) !== req.user?._id) {
        throw new DellError('Нельзя удалять чужие карточки');
      } else {
        card.remove().then((c) => {
          res.send(`Карточка удалена ${c}`);
        })
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Неправильный id карточки');
      } else return next(err);
    });
};
export const likeCard = (req: SessionRequest, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet:
        { likes: req.user?._id },
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Неправильный id');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'Validation failed') {
        throw new NotFoundError('Неправильный id');
      }
      return next(err);
    });
};
export const dislikeCard = (req:SessionRequest, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: (req as any).user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Неправильный id');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'Validation failed') {
        throw new NotFoundError('Неправильный id');
      }
      return next(err);
    });
};
