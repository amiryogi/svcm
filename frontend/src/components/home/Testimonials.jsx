import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'BBS Graduate, 2023',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      content: 'SVCM Campus provided me with the foundation I needed to succeed in the business world. The faculty\'s dedication and practical approach to learning made all the difference.',
      rating: 5,
      company: 'Nepal Telecom',
    },
    {
      id: 2,
      name: 'Rajesh Thapa',
      role: 'BBS Graduate, 2022',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      content: 'The supportive environment and quality education at SVCM helped me secure a position at a leading bank right after graduation. Forever grateful!',
      rating: 5,
      company: 'Sanima Bank',
    },
    {
      id: 3,
      name: 'Sunita Gurung',
      role: 'BBS Graduate, 2024',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      content: 'The campus life at SVCM is amazing. From academics to extracurricular activities, I had the best four years of my life here.',
      rating: 5,
      company: 'Entrepreneur',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4"
          >
            Student Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-gray-900 mb-4"
          >
            What Our <span className="text-primary-600">Students Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Hear from our alumni about their experiences at SVCM Campus.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="text-6xl text-primary-200 absolute top-6 right-6 font-serif">
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="text-accent-500 text-xl" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-primary-600 font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
