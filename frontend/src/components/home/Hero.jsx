import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiAcademicCap, HiUserGroup, HiOfficeBuilding } from 'react-icons/hi';

const Hero = () => {
  const stats = [
    { icon: HiAcademicCap, value: '25+', label: 'Years of Excellence' },
    { icon: HiUserGroup, value: '5000+', label: 'Alumni Network' },
    { icon: HiOfficeBuilding, value: '100%', label: 'Placement Support' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Students at campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/85 to-primary-800/75" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 text-accent-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              TU Affiliated Campus
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl text-white mb-6 text-shadow-lg"
          >
            Shape Your Future with{' '}
            <span className="gradient-text">Business Excellence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
          >
            Join SVCM Campus for a world-class Bachelor of Business Studies (BBS) education 
            under Tribhuvan University. Empowering future business leaders with knowledge, 
            skills, and values.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/admission" className="btn-accent text-lg px-8 py-4 group">
              Apply for Admission
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900 text-lg px-8 py-4">
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <stat.icon className="text-2xl text-accent-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-accent-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
