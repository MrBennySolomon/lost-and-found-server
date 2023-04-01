import express     from 'express';
import {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem
}                  from '../controllers/itemsController.js';
import itemsRouter from './itemsRoutes.js';

const router = express.Router();

router.use('/items', itemsRouter);

router.route('/').get(getItems).post(createItem);
router.route('/:id').get(getItem).put(updateItem).delete(deleteItem);

export default router;