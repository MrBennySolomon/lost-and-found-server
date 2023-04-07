import express     from 'express';
import multer      from 'multer';
import {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
  uploadItem
}                  from '../controllers/itemsController.js';
const router = express.Router();

router.route('/').get(getItems).post(createItem);
router.route('/:id').get(getItem).put(updateItem).delete(deleteItem);
const upload = multer({
  dest: 'files'
})
router.post('/upload', upload.single('file'), uploadItem);

export default router;