import { Router } from 'express';
import {
  getUsers,
  createUser,
  findUser,
  updateUser,
  updateAvatar,
  getUser,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', updateUser);
router.get('/me', getUser);
router.patch('/me/avatar', updateAvatar);
router.get('/:userId', findUser);
export default router;
