import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiPaperAirplane } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const contactInfo = [
    {
      icon: HiLocationMarker,
      title: 'Address',
      details: ['Kathmandu Metropolitan City', 'Bagmati Province, Nepal'],
    },
    {
      icon: HiPhone,
      title: 'Phone',
      details: ['+977-1-1234567', '+977-1-1234568'],
    },
    {
      icon: HiMail,
      title: 'Email',
      details: ['info@svcm.edu.np', 'admission@svcm.edu.np'],
    },
    {
      icon: HiClock,
      title: 'Office Hours',
      details: ['Sun - Fri: 7:00 AM - 5:00 PM', 'Sat: Closed'],
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent successfully! We will get back to you soon.');
    reset();
    setIsSubmitting(false);
  };

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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Have questions? We'd love to hear from you. Reach out to us anytime.
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-xl text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all`}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="form-input"
                        placeholder="98XXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="form-label">Subject *</label>
                      <select
                        {...register('subject', { required: 'Subject is required' })}
                        className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Subject</option>
                        <option value="admission">Admission Inquiry</option>
                        <option value="program">Program Information</option>
                        <option value="scholarship">Scholarship</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="form-label">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows="5"
                        className={`form-input resize-none ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="How can we help you?"
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <HiPaperAirplane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2504189615177!2d85.31409731506215!3d27.714587682789193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a7e6e0d20f%3A0x74e7a8f0f9c8f7f8!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SVCM Campus Location"
        ></iframe>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Quick answers to common queries</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  question: 'What are the admission requirements for BBS?',
                  answer: 'Students must have passed +2 or Intermediate level with minimum 1.8 GPA and be between 17-40 years of age.',
                },
                {
                  question: 'Is there a scholarship program available?',
                  answer: 'Yes, we offer merit-based and need-based scholarships for deserving students. Contact the admission office for details.',
                },
                {
                  question: 'What are the class timings?',
                  answer: 'We offer three shifts: Morning (6:30 AM - 10:30 AM), Day (10:30 AM - 2:30 PM), and Evening (3:00 PM - 7:00 PM).',
                },
                {
                  question: 'Is the degree recognized internationally?',
                  answer: 'Yes, the BBS degree from Tribhuvan University is recognized internationally and accepted for higher studies abroad.',
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm group"
                >
                  <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex justify-between items-center">
                    {faq.question}
                    <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
