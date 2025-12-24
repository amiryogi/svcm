import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Activities = () => {
  const activities = [
    {
      title: 'Sports Events',
      description: 'Annual sports week, inter-college tournaments, and various indoor/outdoor games.',
      image: 'https://images.unsplash.com/photo-1461896836934- voices?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Cultural Programs',
      description: 'Cultural festivals, talent shows, and celebrations of Nepal\'s diverse traditions.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Seminars & Workshops',
      description: 'Regular seminars by industry experts and skill development workshops.',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Educational Tours',
      description: 'Industrial visits, field trips, and educational excursions across Nepal.',
      image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-semibold mb-4"
            >
              Campus Life
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-gray-900"
            >
              Student <span className="text-accent-600">Activities</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/about" className="btn-outline group">
              View All Activities
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl h-80 card-hover"
            >
              <img
                src={activity.fallbackImage || activity.image}
                alt={activity.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {activity.description}
                </p>
              </div>
              <div className="absolute top-6 right-6">
                <span className="badge badge-accent">
                  Popular
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
