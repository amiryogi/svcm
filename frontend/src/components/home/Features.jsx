import { motion } from 'framer-motion';
import { 
  HiAcademicCap, 
  HiLightBulb, 
  HiUserGroup, 
  HiGlobe, 
  HiTrendingUp,
  HiShieldCheck 
} from 'react-icons/hi';

const Features = () => {
  const features = [
    {
      icon: HiAcademicCap,
      title: 'TU Curriculum',
      description: 'Comprehensive BBS curriculum approved by Tribhuvan University with modern teaching methodologies.',
      color: 'from-primary-500 to-primary-700',
    },
    {
      icon: HiLightBulb,
      title: 'Expert Faculty',
      description: 'Learn from experienced professors and industry experts who bring real-world knowledge.',
      color: 'from-accent-400 to-accent-600',
    },
    {
      icon: HiUserGroup,
      title: 'Small Class Sizes',
      description: 'Personalized attention with optimal student-to-teacher ratios for better learning outcomes.',
      color: 'from-primary-600 to-primary-800',
    },
    {
      icon: HiGlobe,
      title: 'Industry Connect',
      description: 'Strong industry partnerships providing internships and job placement opportunities.',
      color: 'from-accent-500 to-accent-700',
    },
    {
      icon: HiTrendingUp,
      title: 'Career Growth',
      description: 'Comprehensive career counseling and placement support for all students.',
      color: 'from-primary-500 to-accent-500',
    },
    {
      icon: HiShieldCheck,
      title: 'Recognized Degree',
      description: 'Internationally recognized degree from Nepal\'s oldest and most prestigious university.',
      color: 'from-primary-700 to-primary-900',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-gray-900 mb-4"
          >
            Features That Set Us{' '}
            <span className="text-primary-600">Apart</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Discover what makes SVCM Campus the preferred choice for business education in Nepal.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow card-hover group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
