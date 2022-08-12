import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  getCards,
} from '../controllers/cards';
import { UrlPicture, IDValid } from '../constants/RegularConst';

const router = Router();

router.get('/cards', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(UrlPicture).message('Некорректно указан url'),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).pattern(IDValid)
      .message('Некоректный ID'),
  }),
}), deleteCard);
router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).pattern(IDValid)
      .message('Некоректный ID'),
  }),
}), likeCard);
router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).pattern(IDValid)
      .message('Некоректный ID'),
  }),
}), dislikeCard);
export default router;
