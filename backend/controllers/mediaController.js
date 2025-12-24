import Media from '../models/Media.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Upload media file
// @route   POST /api/media/upload
// @access  Private/Admin
export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }
    
    // Determine type from mimetype
    let type = 'document';
    if (req.file.mimetype?.startsWith('image/')) {
      type = 'image';
    } else if (req.file.mimetype?.startsWith('video/')) {
      type = 'video';
    }
    
    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: req.file.path,
      publicId: req.file.filename,
      type,
      format: req.file.format || req.file.mimetype?.split('/')[1],
      size: req.file.size,
      width: req.file.width,
      height: req.file.height,
      uploadedBy: req.user.id,
    });
    
    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all media
// @route   GET /api/media
// @access  Private/Admin
export const getMedia = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const query = {};
    
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    const total = await Media.countDocuments(query);
    const media = await Media.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: media.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }
    
    // Determine resource type for Cloudinary
    let resourceType = 'image';
    if (media.type === 'video') {
      resourceType = 'video';
    } else if (media.type === 'document') {
      resourceType = 'raw';
    }
    
    await deleteFromCloudinary(media.publicId, resourceType);
    await media.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
