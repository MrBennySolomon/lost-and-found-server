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
  dest: 'files',
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.loader.js$/) &&
        !file.originalname.match(/\.data.unityweb$/) &&
        !file.originalname.match(/\.framework.js.unityweb$/) &&
        !file.originalname.match(/\.wasm.unityweb$/)) {
          return cb(new Error('Please upload unity webGL files (*.loader.js | *.data.unityweb | *.framework.js.unityweb | *.wasm.unityweb'));
    }else{
      cb(undefined, true);
    }
  }
})
router.post('/upload', upload.single('file'), uploadItem);

export default router;