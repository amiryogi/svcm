import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiClock, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { noticeAPI } from '../../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await noticeAPI.getAll();
        setEvents(response.data.data);
      } catch (error) {
        console.error('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Admission: 'bg-primary-500',
      Sports: 'bg-accent-500',
      Workshop: 'bg-blue-500',
      Cultural: 'bg-purple-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
            >
              Stay Updated
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-lg text-gray-900"
            >
              Upcoming <span className="text-primary-600">Events</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blog" className="btn-primary group">
              View All Events
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-12">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-gray-500">No upcoming events found.</div>
          ) : (
            <>
              {/* Featured Event (Highlights) */}
              {events.filter(e => e.isHighlight).slice(0, 1).map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-2 lg:row-span-2 group"
                >
                  <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden card-hover">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-900/50 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Highlight
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-300">
                        <span className="flex items-center gap-2">
                          <HiCalendar className="text-accent-400" />
                          {formatDate(event.createdAt)}
                        </span>
                        {event.expiryDate && (
                          <span className="flex items-center gap-2">
                            <HiClock className="text-accent-400" />
                            Until {formatDate(event.expiryDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Other Events */}
              {events.filter(e => !e.isHighlight).slice(0, 4).map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <HiCalendar className="text-primary-500" />
                        {formatDate(event.createdAt)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
