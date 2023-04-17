import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

// import User from '../models/User.js';

// import { protect, authorize } from './../middleware/authMiddleware.js';
// import advancedResults from '../middleware/advancedResults.js';
import { loginUser } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

//router.use(protect);
//router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers)
  .post(createUser)
  .post(loginUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

export default router;