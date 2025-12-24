import { motion } from 'framer-motion';
import { HiAcademicCap, HiClock, HiCurrencyDollar, HiBookOpen, HiCheckCircle, HiBriefcase } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const ProgramsPage = () => {
  const yearWiseCurriculum = [
    {
      year: 'First Year',
      subjects: [
        'Business English',
        'Business Mathematics',
        'Microeconomics',
        'Financial Accounting I',
        'Business Statistics',
        'Fundamentals of Management',
      ],
    },
    {
      year: 'Second Year',
      subjects: [
        'Business Communication',
        'Macroeconomics',
        'Financial Accounting II',
        'Cost & Management Accounting',
        'Business Law',
        'Organizational Behavior',
      ],
    },
    {
      year: 'Third Year',
      subjects: [
        'Marketing Management',
        'Financial Management',
        'Human Resource Management',
        'Taxation in Nepal',
        'Entrepreneurship Development',
        'Research Methodology',
      ],
    },
    {
      year: 'Fourth Year',
      subjects: [
        'International Business',
        'Strategic Management',
        'Project Work',
        'Elective I',
        'Elective II',
        'Internship',
      ],
    },
  ];

  const careerPaths = [
    { title: 'Banking & Finance', icon: HiCurrencyDollar, roles: ['Bank Officer', 'Financial Analyst', 'Investment Advisor'] },
    { title: 'Management', icon: HiBriefcase, roles: ['HR Manager', 'Operations Manager', 'Project Manager'] },
    { title: 'Marketing', icon: HiBookOpen, roles: ['Marketing Manager', 'Brand Manager', 'Sales Executive'] },
    { title: 'Entrepreneurship', icon: HiAcademicCap, roles: ['Startup Founder', 'Business Consultant', 'Freelancer'] },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm font-semibold mb-4">
                TU Affiliated Program
              </span>
              <h1 className="heading-xl mb-6">
                Bachelor of Business Studies (BBS)
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                A comprehensive four-year undergraduate program designed to develop 
                future business leaders with strong analytical and management skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admission" className="btn-accent">
                  Apply Now
                </Link>
                <a href="#curriculum" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900">
                  View Curriculum
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="BBS Program"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Program Overview</h2>
            <p className="text-gray-600 text-lg">
              The BBS program under Tribhuvan University provides a solid foundation in 
              business principles, preparing graduates for diverse career opportunities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: HiClock, label: 'Duration', value: '4 Years' },
              { icon: HiAcademicCap, label: 'Degree', value: 'Bachelor\'s' },
              { icon: HiBookOpen, label: 'Credits', value: '126' },
              { icon: HiBriefcase, label: 'Internship', value: 'Mandatory' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-gray-500">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Year-wise Curriculum</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive syllabus designed by Tribhuvan University covering all aspects of business management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {yearWiseCurriculum.map((year, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{year.year}</h3>
                </div>
                <ul className="space-y-3">
                  {year.subjects.map((subject, subIndex) => (
                    <li key={subIndex} className="flex items-center gap-3">
                      <HiCheckCircle className="text-primary-500 flex-shrink-0" />
                      <span className="text-gray-700">{subject}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shifts Available */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-gray-900 mb-4">Available Shifts</h2>
            <p className="text-gray-600 text-lg">
              Choose a shift that fits your schedule
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Morning', time: '6:30 AM - 10:30 AM', icon: '🌅', description: 'Perfect for early risers' },
              { name: 'Day', time: '10:30 AM - 2:30 PM', icon: '☀️', description: 'Regular daytime classes' },
              { name: 'Evening', time: '3:00 PM - 7:00 PM', icon: '🌆', description: 'Ideal for working students' },
            ].map((shift, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{shift.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{shift.name} Shift</h3>
                <p className="text-primary-600 font-semibold mb-2">{shift.time}</p>
                <p className="text-gray-500 text-sm">{shift.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="section-padding gradient-hero text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Career Opportunities</h2>
            <p className="text-gray-300 text-lg">
              BBS graduates are well-positioned for diverse career paths
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent-500/20 flex items-center justify-center mb-4">
                  <career.icon className="text-2xl text-accent-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{career.title}</h3>
                <ul className="space-y-2">
                  {career.roles.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                      {role}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-primary-800 text-lg mb-8 max-w-2xl mx-auto">
            Join SVCM Campus and become part of a thriving community of future business leaders.
          </p>
          <Link to="/admission" className="bg-primary-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-800 transition-colors inline-flex items-center gap-2">
            Apply for Admission
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
