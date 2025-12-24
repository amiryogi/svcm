import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { pageAPI } from '../../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dynamicPages, setDynamicPages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchDynamicPages();
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchDynamicPages = async () => {
    try {
      const response = await pageAPI.getAll();
      if (response.data.data) {
        setDynamicPages(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch pages for navbar');
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Admission', path: '/admission' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    ...dynamicPages.map(page => ({
      name: page.title,
      path: `/page/${page.slug}`
    }))
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-900 text-white py-2 hidden lg:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+977-1-1234567" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <HiPhone className="text-accent-400" />
              <span>+977-1-1234567</span>
            </a>
            <a href="mailto:info@svcm.edu.np" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <HiMail className="text-accent-400" />
              <span>info@svcm.edu.np</span>
            </a>
            <span className="flex items-center gap-2">
              <HiLocationMarker className="text-accent-400" />
              <span>Kathmandu, Nepal</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent-400 transition-colors" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-accent-400 transition-colors" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-accent-400 transition-colors" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-accent-400 transition-colors" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-800">SVCM Campus</h1>
                <p className="text-xs text-gray-500">TU Affiliated</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors animated-underline ${
                      isActive
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link to="/admission" className="btn-accent">
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container-custom py-4 space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-2 font-medium transition-colors ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-gray-700 hover:text-primary-600'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <Link to="/admission" className="btn-accent w-full text-center block">
                  Apply Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
