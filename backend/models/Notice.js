import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  image: {
    type: String,
    default: '',
  },
  imagePublicId: {
    type: String,
    default: '',
  },
  isHighlight: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    default: 0,
  },
  expiryDate: {
    type: Date,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for sorting and filtering
noticeSchema.index({ isActive: 1, isHighlight: 1, priority: -1 });

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
