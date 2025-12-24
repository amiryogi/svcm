import mongoose from 'mongoose';
import slugify from 'slugify';

const pageSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  metaTitle: {
    type: String,
    maxlength: [60, 'Meta title should not exceed 60 characters'],
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description should not exceed 160 characters'],
  },
  featuredImage: {
    type: String,
    default: '',
  },
  featuredImagePublicId: {
    type: String,
    default: '',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Generate slug before saving
pageSchema.pre('save', function() {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Page = mongoose.model('Page', pageSchema);

export default Page;
