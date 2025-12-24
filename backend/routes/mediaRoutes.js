import express from 'express';
import { 
  uploadMedia,
  getMedia,
  deleteMedia 
} from '../controllers/mediaController.js';
import { protect, editorOrAdmin } from '../middleware/auth.js';
import { uploadGeneral } from '../config/cloudinary.js';

const router = express.Router();

// All routes are protected
router.use(protect, editorOrAdmin);

router.post('/upload', uploadGeneral.single('file'), uploadMedia);
router.get('/', getMedia);
router.delete('/:id', deleteMedia);

export default router;
