import { motion } from 'framer-motion';
import { 
  HiLibrary, 
  HiDesktopComputer, 
  HiWifi, 
  HiBeaker,
  HiCake,
  HiSun 
} from 'react-icons/hi';
import { FaChalkboardTeacher, FaParking } from 'react-icons/fa';
import { MdSportsBasketball } from 'react-icons/md';

const Facilities = () => {
  const facilities = [
    {
      icon: HiLibrary,
      title: 'Modern Library',
      description: 'Well-stocked library with 10,000+ books, journals, and digital resources.',
    },
    {
      icon: HiDesktopComputer,
      title: 'Computer Lab',
      description: 'State-of-the-art computer labs with high-speed internet connectivity.',
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Smart Classrooms',
      description: 'Projector-equipped classrooms with modern audio-visual aids.',
    },
    {
      icon: HiWifi,
      title: 'Campus WiFi',
      description: 'Free high-speed WiFi available throughout the campus premises.',
    },
    {
      icon: HiCake,
      title: 'Cafeteria',
      description: 'Hygienic cafeteria serving nutritious meals at affordable prices.',
    },
    {
      icon: MdSportsBasketball,
      title: 'Sports Ground',
      description: 'Dedicated sports facilities for cricket, football, basketball, and more.',
    },
    {
      icon: HiSun,
      title: 'Green Campus',
      description: 'Eco-friendly campus with gardens and peaceful study environments.',
    },
    {
      icon: FaParking,
      title: 'Parking Area',
      description: 'Spacious and secure parking for two-wheelers and four-wheelers.',
    },
  ];

  return (
    <section className="section-padding gradient-hero text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-4"
          >
            World-Class Infrastructure
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            Campus <span className="text-accent-400">Facilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg"
          >
            Experience learning in a well-equipped environment designed for your success.
          </motion.p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500 group-hover:scale-110 transition-all">
                <facility.icon className="text-3xl text-accent-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">{facility.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50,000+', label: 'Sq. Ft. Campus' },
            { value: '40+', label: 'Classrooms' },
            { value: '200+', label: 'Computers' },
            { value: '24/7', label: 'Security' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;
