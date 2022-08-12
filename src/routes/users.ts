import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers,
  findUser,
  updateUser,
  updateAvatar,
  getUser,
} from '../controllers/users';
import { IDValid, UrlPicture } from '../constants/RegularConst';

const router = Router();
router.get('/', getUsers);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.get('/me', getUser);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(UrlPicture)
        .message('Некорректно указан url'),
    }),
  }),
  updateAvatar,
);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).pattern(IDValid),
  }),
}), findUser);
export default router;
