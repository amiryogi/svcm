import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video', 'document'],
    required: true,
  },
  format: {
    type: String,
  },
  size: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for filtering
mediaSchema.index({ type: 1, createdAt: -1 });

const Media = mongoose.model('Media', mediaSchema);

export default Media;
