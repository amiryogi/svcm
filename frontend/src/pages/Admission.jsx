import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { HiCheckCircle, HiArrowLeft, HiArrowRight, HiDocumentText, HiUpload } from 'react-icons/hi';
import { admissionAPI } from '../services/api';

const AdmissionPage = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState({});

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm({
    mode: 'onChange',
  });

  const totalSteps = 5;

  const requirements = [
    'Passed +2 or Intermediate level examination',
    'Minimum GPA of 1.8 or equivalent percentage',
    'Age: 17-40 years at the time of admission',
    'Character certificate from previous institution',
    'Valid citizenship or birth certificate',
  ];

  const documents = [
    { id: 'photo', label: 'Passport Size Photo', required: true },
    { id: 'citizenship', label: 'Citizenship/Birth Certificate', required: true },
    { id: 'marksheet', label: '+2 Marksheet', required: true },
    { id: 'characterCertificate', label: 'Character Certificate', required: false },
  ];

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const nextStep = async () => {
    // Step 4 Validation (Documents) - Manual check since file inputs aren't registered
    if (step === 4) {
      const requiredDocs = ['photo', 'citizenship', 'marksheet'];
      const missingDocs = requiredDocs.filter(doc => !files[doc]);
      
      if (missingDocs.length > 0) {
        toast.error('Please upload all required documents: Photo, Citizenship, and Marksheet');
        return;
      }
    }

    const fieldsToValidate = getFieldsForStep(step);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (stepNum) => {
    switch (stepNum) {
      case 1:
        return ['fullName', 'email', 'phone', 'dateOfBirth', 'gender'];
      case 2:
        return ['district', 'municipality', 'ward'];
      case 3:
        return ['level', 'board', 'institution', 'passedYear', 'shift'];
      case 4:
        return [];
      case 5:
        return ['guardianName', 'relation', 'guardianPhone'];
      default:
        return [];
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Basic fields
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('dateOfBirth', data.dateOfBirth);
      formData.append('gender', data.gender);
      formData.append('shift', data.shift);
      
      // Address
      formData.append('address', JSON.stringify({
        district: data.district,
        municipality: data.municipality,
        ward: parseInt(data.ward),
        tole: data.tole || '',
      }));
      
      // Previous Education
      formData.append('previousEducation', JSON.stringify({
        level: data.level,
        board: data.board,
        institution: data.institution,
        passedYear: parseInt(data.passedYear),
        gpa: data.gpa ? parseFloat(data.gpa) : undefined,
        percentage: data.percentage ? parseFloat(data.percentage) : undefined,
      }));
      
      // Guardian
      formData.append('guardian', JSON.stringify({
        name: data.guardianName,
        relation: data.relation,
        phone: data.guardianPhone,
        occupation: data.guardianOccupation || '',
      }));
      
      // Files
      if (files.photo) formData.append('photo', files.photo);
      if (files.citizenship) formData.append('citizenship', files.citizenship);
      if (files.marksheet) formData.append('marksheet', files.marksheet);
      if (files.characterCertificate) formData.append('characterCertificate', files.characterCertificate);
      
      await admissionAPI.submit(formData);
      setIsSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 shadow-xl text-center max-w-lg"
        >
          <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle className="text-5xl text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying to SVCM Campus. We have received your application and will 
            review it shortly. You will receive an email confirmation at the provided email address.
          </p>
          <a href="/" className="btn-primary">Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-xl mb-4"
          >
            Admission 2025
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Begin your journey towards a successful business career with SVCM Campus.
          </motion.p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <HiCheckCircle className="text-primary-500 text-xl flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
                <span className="text-sm text-primary-600 font-medium">
                  {Math.round((step / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          {...register('fullName', { required: 'Full name is required' })}
                          className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                          })}
                          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Phone *</label>
                        <input
                          type="tel"
                          {...register('phone', { 
                            required: 'Phone is required',
                            pattern: { value: /^[0-9]{10}$/, message: 'Enter 10-digit phone number' }
                          })}
                          className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="98XXXXXXXX"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Date of Birth *</label>
                        <input
                          type="date"
                          {...register('dateOfBirth', { required: 'Date of birth is required' })}
                          className={`form-input ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Gender *</label>
                        <select
                          {...register('gender', { required: 'Gender is required' })}
                          className={`form-input ${errors.gender ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">District *</label>
                        <input
                          type="text"
                          {...register('district', { required: 'District is required' })}
                          className={`form-input ${errors.district ? 'border-red-500' : ''}`}
                          placeholder="e.g., Kathmandu"
                        />
                        {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Municipality/VDC *</label>
                        <input
                          type="text"
                          {...register('municipality', { required: 'Municipality is required' })}
                          className={`form-input ${errors.municipality ? 'border-red-500' : ''}`}
                          placeholder="e.g., Kathmandu Metropolitan City"
                        />
                        {errors.municipality && <p className="text-red-500 text-sm mt-1">{errors.municipality.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Ward No. *</label>
                        <input
                          type="number"
                          {...register('ward', { required: 'Ward is required', min: 1 })}
                          className={`form-input ${errors.ward ? 'border-red-500' : ''}`}
                          placeholder="e.g., 10"
                        />
                        {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Tole/Street</label>
                        <input
                          type="text"
                          {...register('tole')}
                          className="form-input"
                          placeholder="e.g., Baneshwor"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Education */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Previous Education</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Level *</label>
                        <select
                          {...register('level', { required: 'Level is required' })}
                          className={`form-input ${errors.level ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select Level</option>
                          <option value="+2">+2</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="A-Level">A-Level</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Board *</label>
                        <input
                          type="text"
                          {...register('board', { required: 'Board is required' })}
                          className={`form-input ${errors.board ? 'border-red-500' : ''}`}
                          placeholder="e.g., NEB"
                        />
                        {errors.board && <p className="text-red-500 text-sm mt-1">{errors.board.message}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">Institution Name *</label>
                        <input
                          type="text"
                          {...register('institution', { required: 'Institution is required' })}
                          className={`form-input ${errors.institution ? 'border-red-500' : ''}`}
                          placeholder="Name of your previous school/college"
                        />
                        {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Passed Year *</label>
                        <input
                          type="number"
                          {...register('passedYear', { required: 'Passed year is required', min: 1990, max: 2100 })}
                          className={`form-input ${errors.passedYear ? 'border-red-500' : ''}`}
                          placeholder="e.g., 2024"
                        />
                        {errors.passedYear && <p className="text-red-500 text-sm mt-1">{errors.passedYear.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">GPA / Percentage</label>
                        <input
                          type="number"
                          step="0.01"
                          {...register('gpa')}
                          className="form-input"
                          placeholder="e.g., 3.2 or 75%"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">Preferred Shift *</label>
                        <div className="grid grid-cols-3 gap-4">
                          {['Morning', 'Day', 'Evening'].map((shift) => (
                            <label key={shift} className="relative">
                              <input
                                type="radio"
                                value={shift}
                                {...register('shift', { required: 'Please select a shift' })}
                                className="peer sr-only"
                              />
                              <div className="p-4 rounded-xl border-2 border-gray-200 text-center cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 transition-all">
                                <span className="font-medium text-gray-700">{shift}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.shift && <p className="text-red-500 text-sm mt-1">{errors.shift.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Documents */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Documents</h3>
                    <div className="space-y-6">
                      {documents.map((doc) => (
                        <div key={doc.id} className="border-2 border-dashed border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${files[doc.id] ? 'bg-primary-100' : 'bg-gray-100'}`}>
                                {files[doc.id] ? (
                                  <HiCheckCircle className="text-2xl text-primary-600" />
                                ) : (
                                  <HiDocumentText className="text-2xl text-gray-400" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {doc.label} {doc.required && <span className="text-red-500">*</span>}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {files[doc.id] ? files[doc.id].name : 'JPG, PNG or PDF (max 5MB)'}
                                </p>
                              </div>
                            </div>
                            <label className="btn-outline cursor-pointer">
                              <HiUpload />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                onChange={(e) => handleFileChange(e, doc.id)}
                                className="sr-only"
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Guardian */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Guardian Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="form-label">Guardian Name *</label>
                        <input
                          type="text"
                          {...register('guardianName', { required: 'Guardian name is required' })}
                          className={`form-input ${errors.guardianName ? 'border-red-500' : ''}`}
                          placeholder="Full name of guardian"
                        />
                        {errors.guardianName && <p className="text-red-500 text-sm mt-1">{errors.guardianName.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Relation *</label>
                        <select
                          {...register('relation', { required: 'Relation is required' })}
                          className={`form-input ${errors.relation ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select Relation</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.relation && <p className="text-red-500 text-sm mt-1">{errors.relation.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Guardian Phone *</label>
                        <input
                          type="tel"
                          {...register('guardianPhone', { 
                            required: 'Phone is required',
                            pattern: { value: /^[0-9]{10}$/, message: 'Enter 10-digit phone number' }
                          })}
                          className={`form-input ${errors.guardianPhone ? 'border-red-500' : ''}`}
                          placeholder="98XXXXXXXX"
                        />
                        {errors.guardianPhone && <p className="text-red-500 text-sm mt-1">{errors.guardianPhone.message}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">Occupation</label>
                        <input
                          type="text"
                          {...register('guardianOccupation')}
                          className="form-input"
                          placeholder="e.g., Business, Government Service"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`btn-outline ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <HiArrowLeft />
                    Previous
                  </button>
                  {step < totalSteps ? (
                    <button type="button" onClick={nextStep} className="btn-primary">
                      Next
                      <HiArrowRight />
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="btn-accent">
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionPage;
