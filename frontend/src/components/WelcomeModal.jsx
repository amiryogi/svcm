import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiSpeakerphone, HiCalendar, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { noticeAPI } from '../services/api';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Check if modal was already shown today
    const lastShown = localStorage.getItem('welcomeModalLastShown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // Fetch highlights
      fetchHighlights();
    }
  }, []);

  const fetchHighlights = async () => {
    try {
      const response = await noticeAPI.getHighlights();
      if (response.data.data && response.data.data.length > 0) {
        setNotices(response.data.data);
        setIsOpen(true);
      }
    } catch (error) {
      // Use sample data if API fails
      const sampleNotices = [
        {
          _id: '1',
          title: '🎓 Admission Open for 2025',
          content: 'Applications are now being accepted for the Bachelor of Business Studies (BBS) program. Limited seats available. Apply now to secure your future!',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          title: '📚 Scholarship Opportunities',
          content: 'Merit-based and need-based scholarships are available for deserving students. Contact the admission office for more details.',
          createdAt: new Date().toISOString(),
        },
      ];
      setNotices(sampleNotices);
      setIsOpen(true);
    }
  };

  const closeModal = (dontShowAgain = false) => {
    if (dontShowAgain) {
      localStorage.setItem('welcomeModalLastShown', new Date().toDateString());
    }
    setIsOpen(false);
  };

  const nextNotice = () => {
    setCurrentIndex((prev) => (prev + 1) % notices.length);
  };

  const prevNotice = () => {
    setCurrentIndex((prev) => (prev - 1 + notices.length) % notices.length);
  };

  if (!isOpen || notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={() => closeModal()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Header */}
            {currentNotice.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={currentNotice.image}
                  alt={currentNotice.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-accent-400 text-sm mb-1">
                    <HiSpeakerphone />
                    <span>Important Notice</span>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {!currentNotice.image && (
                <div className="flex items-center gap-2 text-primary-600 text-sm mb-3">
                  <HiSpeakerphone />
                  <span>Important Notice</span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {currentNotice.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentNotice.content}
              </p>

              {/* Navigation Dots */}
              {notices.length > 1 && (
                <div className="flex items-center justify-center gap-2 mb-6">
                  {notices.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-6 bg-primary-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/admission"
                  onClick={() => closeModal()}
                  className="btn-primary flex-1 justify-center"
                >
                  Apply Now
                  <HiArrowRight />
                </Link>
                <button
                  onClick={() => closeModal()}
                  className="btn-outline flex-1 justify-center"
                >
                  View Later
                </button>
              </div>

              {/* Don't show again */}
              <button
                onClick={() => closeModal(true)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4 transition-colors"
              >
                Don't show again today
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all shadow-lg"
            >
              <HiX size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
