import { Router } from 'express';

import {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/likes/:cardId', likeCard);
router.delete('/likes/:cardId', dislikeCard);
export default router;
