import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  logout,
  setupAdmin 
} from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/setup', setupAdmin);

// Protected routes
router.post('/register', protect, adminOnly, register);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;
