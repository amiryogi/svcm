import Blog from '../models/Blog.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const query = { isPublished: true };
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blogs (admin)
// @route   GET /api/blogs/admin
// @access  Private/Admin
export const getAllBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    }).populate('author', 'name avatar');
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    // Handle image upload
    if (req.file) {
      req.body.featuredImage = req.file.path;
      req.body.featuredImagePublicId = req.file.filename;
    }

    // Parse types from FormData
    if (req.body.isPublished !== undefined) {
      req.body.isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    }
    
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    }
    
    const blog = await Blog.create(req.body);
    
    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    
    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.featuredImagePublicId) {
        await deleteFromCloudinary(blog.featuredImagePublicId);
      }
      req.body.featuredImage = req.file.path;
      req.body.featuredImagePublicId = req.file.filename;
    }

    // Parse types from FormData
    if (req.body.isPublished !== undefined) {
      req.body.isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    }
    
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    }
    
    // Update fields
    Object.assign(blog, req.body);
    
    // Save to trigger hooks (slug generation, etc)
    await blog.save();
    
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    
    // Delete image from Cloudinary
    if (blog.featuredImagePublicId) {
      await deleteFromCloudinary(blog.featuredImagePublicId);
    }
    
    await blog.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
