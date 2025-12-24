import Admission from '../models/Admission.js';
import { deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Submit admission form
// @route   POST /api/admissions
// @access  Public
export const submitAdmission = async (req, res, next) => {
  try {
    // Handle document uploads
    if (req.files) {
      const documents = {};
      
      if (req.files.photo && req.files.photo[0]) {
        documents.photo = {
          url: req.files.photo[0].path,
          publicId: req.files.photo[0].filename,
        };
      }
      
      if (req.files.citizenship && req.files.citizenship[0]) {
        documents.citizenship = {
          url: req.files.citizenship[0].path,
          publicId: req.files.citizenship[0].filename,
        };
      }
      
      if (req.files.marksheet && req.files.marksheet[0]) {
        documents.marksheet = {
          url: req.files.marksheet[0].path,
          publicId: req.files.marksheet[0].filename,
        };
      }
      
      if (req.files.characterCertificate && req.files.characterCertificate[0]) {
        documents.characterCertificate = {
          url: req.files.characterCertificate[0].path,
          publicId: req.files.characterCertificate[0].filename,
        };
      }
      
      req.body.documents = documents;
    }
    
    // Parse nested objects from form data
    if (typeof req.body.address === 'string') {
      req.body.address = JSON.parse(req.body.address);
    }
    if (typeof req.body.previousEducation === 'string') {
      req.body.previousEducation = JSON.parse(req.body.previousEducation);
    }
    if (typeof req.body.guardian === 'string') {
      req.body.guardian = JSON.parse(req.body.guardian);
    }
    
    const admission = await Admission.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: admission._id,
        fullName: admission.fullName,
        email: admission.email,
        status: admission.status,
        submittedAt: admission.submittedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all admissions (admin)
// @route   GET /api/admissions
// @access  Private/Admin
export const getAdmissions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ];
    }
    
    const total = await Admission.countDocuments(query);
    const admissions = await Admission.find(query)
      .select('-documents')
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: admissions.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: admissions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single admission
// @route   GET /api/admissions/:id
// @access  Private/Admin
export const getAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate('reviewedBy', 'name');
    
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admission status
// @route   PUT /api/admissions/:id/status
// @access  Private/Admin
export const updateAdmissionStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    
    if (!['pending', 'under-review', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }
    
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      {
        status,
        remarks,
        reviewedAt: new Date(),
        reviewedBy: req.user.id,
      },
      { new: true, runValidators: true }
    );
    
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete admission
// @route   DELETE /api/admissions/:id
// @access  Private/Admin
export const deleteAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id);
    
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found',
      });
    }
    
    // Delete documents from Cloudinary
    const docs = admission.documents;
    if (docs) {
      if (docs.photo?.publicId) await deleteFromCloudinary(docs.photo.publicId);
      if (docs.citizenship?.publicId) await deleteFromCloudinary(docs.citizenship.publicId);
      if (docs.marksheet?.publicId) await deleteFromCloudinary(docs.marksheet.publicId);
      if (docs.characterCertificate?.publicId) await deleteFromCloudinary(docs.characterCertificate.publicId);
    }
    
    await admission.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Admission deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admission statistics
// @route   GET /api/admissions/stats
// @access  Private/Admin
export const getAdmissionStats = async (req, res, next) => {
  try {
    const stats = await Admission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    
    const shiftStats = await Admission.aggregate([
      {
        $group: {
          _id: '$shift',
          count: { $sum: 1 },
        },
      },
    ]);
    
    const total = await Admission.countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats,
        byShift: shiftStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
