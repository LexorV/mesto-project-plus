import { Router } from 'express';
import {
  getUser,
  createUser,
  findUser,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const router = Router();
router.get('/', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', findUser);
export default router;
