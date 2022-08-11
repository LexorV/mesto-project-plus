import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers,
  findUser,
  updateUser,
  updateAvatar,
  getUser,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.get('/me', getUser);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/).message('Некорректно указан url'),//eslint-disable-line
    }),
  }),
  updateAvatar,
);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), findUser);
export default router;
