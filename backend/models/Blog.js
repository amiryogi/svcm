import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    unique: true,
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  featuredImage: {
    type: String,
    default: '',
  },
  featuredImagePublicId: {
    type: String,
    default: '',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['news', 'events', 'academic', 'sports', 'achievements', 'general'],
    default: 'general',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Generate slug before saving
blogSchema.pre('save', function() {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

// Index for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
