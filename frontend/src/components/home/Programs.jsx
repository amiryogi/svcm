import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiClock, HiBookOpen, HiBriefcase } from 'react-icons/hi';

const Programs = () => {
  const programDetails = {
    title: 'Bachelor of Business Studies (BBS)',
    duration: '4 Years',
    affiliation: 'Tribhuvan University',
    shifts: ['Morning (6:30 AM - 10:30 AM)', 'Day (10:30 AM - 2:30 PM)', 'Evening (3:00 PM - 7:00 PM)'],
    subjects: [
      'Business Economics',
      'Accounting',
      'Business Statistics',
      'Marketing Management',
      'Financial Management',
      'Human Resource Management',
      'Business Law',
      'Taxation',
    ],
    careers: [
      'Bank Officer',
      'Financial Analyst',
      'Marketing Manager',
      'HR Manager',
      'Entrepreneur',
      'Tax Consultant',
    ],
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4">
              Our Program
            </span>
            <h2 className="heading-lg text-gray-900 mb-4">
              {programDetails.title}
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              A comprehensive four-year undergraduate program designed to equip students 
              with essential business knowledge, analytical skills, and practical expertise 
              required for success in the modern business world.
            </p>

            {/* Program Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <HiClock className="text-primary-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Duration</span>
                </div>
                <p className="text-gray-600 text-sm">{programDetails.duration}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                    <HiBookOpen className="text-accent-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Affiliation</span>
                </div>
                <p className="text-gray-600 text-sm">{programDetails.affiliation}</p>
              </div>
            </div>

            {/* Available Shifts */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-3">Available Shifts:</h4>
              <div className="flex flex-wrap gap-2">
                {programDetails.shifts.map((shift, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm"
                  >
                    {shift}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/programs" className="btn-primary group">
              View Full Curriculum
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Subjects Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                  <HiBookOpen className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Core Subjects</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {programDetails.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary-500" />
                    <span className="text-sm">{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Careers Card */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <HiBriefcase className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold">Career Opportunities</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {programDetails.careers.map((career, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent-400" />
                    <span className="text-sm text-gray-100">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
