import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'svcm/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

// Storage for documents
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'svcm/documents',
    allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
    resource_type: 'auto',
  },
});

// Storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'svcm/videos',
    allowed_formats: ['mp4', 'webm', 'mov'],
    resource_type: 'video',
  },
});

// Multer upload instances
export const uploadImage = multer({ storage: imageStorage });
export const uploadDocument = multer({ storage: documentStorage });
export const uploadVideo = multer({ storage: videoStorage });

// General upload with file filter
const generalStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'svcm/general';
    let resourceType = 'auto';
    
    if (file.mimetype.startsWith('image/')) {
      folder = 'svcm/images';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'svcm/videos';
      resourceType = 'video';
    } else {
      folder = 'svcm/documents';
    }
    
    return {
      folder,
      resource_type: resourceType,
    };
  },
});

export const uploadGeneral = multer({ storage: generalStorage });

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

export default cloudinary;
