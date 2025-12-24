import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  
  // Address
  address: {
    district: {
      type: String,
      required: [true, 'District is required'],
    },
    municipality: {
      type: String,
      required: [true, 'Municipality is required'],
    },
    ward: {
      type: Number,
      required: [true, 'Ward number is required'],
    },
    tole: {
      type: String,
      default: '',
    },
  },
  
  // Previous Education
  previousEducation: {
    level: {
      type: String,
      required: [true, 'Education level is required'],
      enum: ['+2', 'Intermediate', 'A-Level', 'Other'],
    },
    board: {
      type: String,
      required: [true, 'Board is required'],
    },
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
    },
    passedYear: {
      type: Number,
      required: [true, 'Passed year is required'],
    },
    gpa: {
      type: Number,
      min: [0, 'GPA cannot be negative'],
      max: [4, 'GPA cannot exceed 4'],
    },
    percentage: {
      type: Number,
      min: [0, 'Percentage cannot be negative'],
      max: [100, 'Percentage cannot exceed 100'],
    },
  },
  
  // Program Selection
  program: {
    type: String,
    default: 'BBS',
    enum: ['BBS'],
  },
  shift: {
    type: String,
    enum: ['Morning', 'Day', 'Evening'],
    required: [true, 'Shift selection is required'],
  },
  
  // Documents (Cloudinary URLs)
  documents: {
    photo: {
      url: String,
      publicId: String,
    },
    citizenship: {
      url: String,
      publicId: String,
    },
    marksheet: {
      url: String,
      publicId: String,
    },
    characterCertificate: {
      url: String,
      publicId: String,
    },
  },
  
  // Guardian Information
  guardian: {
    name: {
      type: String,
      required: [true, 'Guardian name is required'],
    },
    relation: {
      type: String,
      required: [true, 'Relation is required'],
    },
    phone: {
      type: String,
      required: [true, 'Guardian phone is required'],
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    occupation: {
      type: String,
      default: '',
    },
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected'],
    default: 'pending',
  },
  remarks: {
    type: String,
    default: '',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for searching and filtering
admissionSchema.index({ status: 1, submittedAt: -1 });
admissionSchema.index({ fullName: 'text', email: 'text' });

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
