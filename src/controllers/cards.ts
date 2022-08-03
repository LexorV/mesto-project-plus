import { Request, Response } from 'express';
import Card from '../models/card';
export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((Card) => res.send({ Card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const createCard = (req: any, res: Response) => {
  const { name, link } = req.body;
  return Card.create({
    name: name,
    link: link,
    owner: req.user._id
  })
    .then((card) => res.send({ card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const deleteCard = (req: Request, res: Response) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({card}))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const likeCard = (req: any, res: Response) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {
      $addToSet:
        { likes: req.user._id }
    },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
export const dislikeCard = (req: any, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}