import Notice from '../models/Notice.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get active notices
// @route   GET /api/notices
// @access  Public
export const getNotices = async (req, res, next) => {
  try {
    const now = new Date();
    const notices = await Notice.find({
      isActive: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gte: now } }
      ]
    })
      .sort({ priority: -1, createdAt: -1 })
      .limit(20);
    
    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get highlight notices for welcome modal
// @route   GET /api/notices/highlights
// @access  Public
export const getHighlights = async (req, res, next) => {
  try {
    const now = new Date();
    const highlights = await Notice.find({
      isActive: true,
      isHighlight: true,
      $or: [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gte: now } }
      ]
    })
      .sort({ priority: -1, createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      count: highlights.length,
      data: highlights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all notices (admin)
// @route   GET /api/notices/admin
// @access  Private/Admin
export const getAllNotices = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const total = await Notice.countDocuments();
    const notices = await Notice.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: notices.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: notices,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single notice
// @route   GET /api/notices/:id
// @access  Public
export const getNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create notice
// @route   POST /api/notices
// @access  Private/Admin
export const createNotice = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    // Handle image upload
    if (req.file) {
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // Parse types from FormData
    if (req.body.isActive !== undefined) {
      req.body.isActive = req.body.isActive === 'true' || req.body.isActive === true;
    }
    if (req.body.isHighlight !== undefined) {
      req.body.isHighlight = req.body.isHighlight === 'true' || req.body.isHighlight === true;
    }
    if (req.body.priority !== undefined) {
      req.body.priority = parseInt(req.body.priority) || 0;
    }
    
    const notice = await Notice.create(req.body);
    
    res.status(201).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private/Admin
export const updateNotice = async (req, res, next) => {
  try {
    let notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found',
      });
    }
    
    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary
      if (notice.imagePublicId) {
        await deleteFromCloudinary(notice.imagePublicId);
      }
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // Parse types from FormData
    if (req.body.isActive !== undefined) {
      req.body.isActive = req.body.isActive === 'true' || req.body.isActive === true;
    }
    if (req.body.isHighlight !== undefined) {
      req.body.isHighlight = req.body.isHighlight === 'true' || req.body.isHighlight === true;
    }
    if (req.body.priority !== undefined) {
      req.body.priority = parseInt(req.body.priority) || 0;
    }
    
    Object.assign(notice, req.body);
    await notice.save();
    
    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private/Admin
export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found',
      });
    }
    
    // Delete image from Cloudinary
    if (notice.imagePublicId) {
      await deleteFromCloudinary(notice.imagePublicId);
    }
    
    await notice.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Notice deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
