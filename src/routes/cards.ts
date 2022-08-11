import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/).message('Некорректно указан url'),//eslint-disable-line
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);
router.put('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);
router.delete('/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);
export default router;
