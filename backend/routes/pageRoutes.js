import express from 'express';
import { 
  getPages,
  getAllPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage 
} from '../controllers/pageController.js';
import { protect, editorOrAdmin } from '../middleware/auth.js';
import { uploadImage } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getPages);
router.get('/detail/:slug', getPageBySlug);

// Protected routes
router.get('/admin', protect, editorOrAdmin, getAllPages);
router.post('/', protect, editorOrAdmin, uploadImage.single('featuredImage'), createPage);
router.put('/:id', protect, editorOrAdmin, uploadImage.single('featuredImage'), updatePage);
router.delete('/:id', protect, editorOrAdmin, deletePage);

export default router;
