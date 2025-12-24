import Page from '../models/Page.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all published pages
// @route   GET /api/pages
// @access  Public
export const getPages = async (req, res, next) => {
  try {
    const pages = await Page.find({ isPublished: true })
      .select('title slug metaTitle metaDescription order')
      .sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all pages (admin)
// @route   GET /api/pages/admin
// @access  Private/Admin
export const getAllPages = async (req, res, next) => {
  try {
    const pages = await Page.find()
      .populate('author', 'name')
      .sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get page by slug
// @route   GET /api/pages/:slug
// @access  Public
export const getPageBySlug = async (req, res, next) => {
  try {
    const page = await Page.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create page
// @route   POST /api/pages
// @access  Private/Admin
export const createPage = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    if (req.file) {
      req.body.featuredImage = req.file.path;
      req.body.featuredImagePublicId = req.file.filename;
    }

    // Parse types from FormData
    if (req.body.isPublished !== undefined) {
      req.body.isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    }
    if (req.body.order !== undefined) {
      req.body.order = parseInt(req.body.order) || 0;
    }
    
    const page = await Page.create(req.body);
    
    res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update page
// @route   PUT /api/pages/:id
// @access  Private/Admin
export const updatePage = async (req, res, next) => {
  try {
    let page = await Page.findById(req.params.id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    if (req.file) {
      if (page.featuredImagePublicId) {
        await deleteFromCloudinary(page.featuredImagePublicId);
      }
      req.body.featuredImage = req.file.path;
      req.body.featuredImagePublicId = req.file.filename;
    }

    // Parse types from FormData
    if (req.body.isPublished !== undefined) {
      req.body.isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    }
    if (req.body.order !== undefined) {
      req.body.order = parseInt(req.body.order) || 0;
    }
    
    Object.assign(page, req.body);
    await page.save();
    
    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
export const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    if (page.featuredImagePublicId) {
      await deleteFromCloudinary(page.featuredImagePublicId);
    }
    
    await page.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
