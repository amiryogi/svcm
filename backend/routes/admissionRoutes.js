import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { 
  submitAdmission,
  getAdmissions,
  getAdmission,
  updateAdmissionStatus,
  deleteAdmission,
  getAdmissionStats
} from '../controllers/admissionController.js';
import { protect, adminOnly } from '../middleware/auth.js';

// Configure storage for admission documents
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'svcm/admissions',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    resource_type: 'auto',
  },
});

const uploadDocuments = multer({ storage: documentStorage });

const router = express.Router();

// Public routes
router.post('/', uploadDocuments.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'citizenship', maxCount: 1 },
  { name: 'marksheet', maxCount: 1 },
  { name: 'characterCertificate', maxCount: 1 }
]), submitAdmission);

// Protected routes
router.get('/', protect, adminOnly, getAdmissions);
router.get('/stats', protect, adminOnly, getAdmissionStats);
router.get('/:id', protect, adminOnly, getAdmission);
router.put('/:id/status', protect, adminOnly, updateAdmissionStatus);
router.delete('/:id', protect, adminOnly, deleteAdmission);

export default router;
