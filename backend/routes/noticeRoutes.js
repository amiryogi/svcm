import express from 'express';
import { 
  getNotices,
  getHighlights,
  getAllNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice 
} from '../controllers/noticeController.js';
import { protect, editorOrAdmin } from '../middleware/auth.js';
import { uploadImage } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getNotices);
router.get('/highlights', getHighlights);
router.get('/detail/:id', getNotice);

// Protected routes
router.get('/admin', protect, editorOrAdmin, getAllNotices);
router.post('/', protect, editorOrAdmin, uploadImage.single('image'), createNotice);
router.put('/:id', protect, editorOrAdmin, uploadImage.single('image'), updateNotice);
router.delete('/:id', protect, editorOrAdmin, deleteNotice);

export default router;
