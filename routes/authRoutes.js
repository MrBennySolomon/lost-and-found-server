import express from 'express';
import {
  registerUser,
  loginUser,
  logout,
  getCurrentUser,
} from '../controllers/authController.js';

import { protect } from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/current-user', protect, getCurrentUser);

export default router;