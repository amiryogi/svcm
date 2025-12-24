import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiAcademicCap, HiCheckCircle } from 'react-icons/hi';

const About = () => {
  const highlights = [
    'Tribhuvan University Affiliation',
    'Experienced Faculty Members',
    'Modern Teaching Methods',
    'Industry-Focused Curriculum',
    'Strong Alumni Network',
    'Career Counseling Support',
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Campus building"
                className="rounded-3xl shadow-2xl w-full"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                    <HiAcademicCap className="text-3xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-primary-700">25+</h4>
                    <p className="text-gray-600">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-8 -left-8 w-full h-full rounded-3xl bg-primary-100 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-200 rounded-full blur-3xl opacity-50 -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="heading-lg text-gray-900 mb-6">
              Excellence in Business{' '}
              <span className="text-primary-600">Education</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              SVCM Campus is a premier institution dedicated to providing quality education 
              in Bachelor of Business Studies (BBS) under Tribhuvan University affiliation. 
              With a rich history spanning over two decades, we have established ourselves 
              as a center of academic excellence in Nepal.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to nurture future business leaders who are not only academically 
              proficient but also ethically grounded and socially responsible. We combine 
              traditional values with modern education to prepare students for the global 
              business environment.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <HiCheckCircle className="text-primary-500 text-xl flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/about" className="btn-primary group">
              Learn More About Us
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
