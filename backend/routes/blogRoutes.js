import express from 'express';
import { 
  getBlogs,
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog 
} from '../controllers/blogController.js';
import { protect, editorOrAdmin } from '../middleware/auth.js';
import { uploadImage } from '../config/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/detail/:slug', getBlogBySlug);

// Protected routes
router.get('/admin', protect, editorOrAdmin, getAllBlogs);
router.post('/', protect, editorOrAdmin, uploadImage.single('featuredImage'), createBlog);
router.put('/:id', protect, editorOrAdmin, uploadImage.single('featuredImage'), updateBlog);
router.delete('/:id', protect, editorOrAdmin, deleteBlog);

export default router;
