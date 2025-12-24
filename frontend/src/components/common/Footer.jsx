import { Link } from 'react-router-dom';
import { HiPhone, HiMail, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Admission', path: '/admission' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const programs = [
    { name: 'BBS (Bachelor of Business Studies)', path: '/programs' },
    { name: 'First Year', path: '/programs' },
    { name: 'Second Year', path: '/programs' },
    { name: 'Third Year', path: '/programs' },
    { name: 'Fourth Year', path: '/programs' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-primary-950 text-white">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-700 to-accent-600 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="text-white/90">
                Join thousands of successful graduates from our campus.
              </p>
            </div>
            <Link
              to="/admission"
              className="bg-white text-primary-800 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all flex items-center gap-2 group"
            >
              Apply for Admission
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <h4 className="text-xl font-bold">SVCM Campus</h4>
                  <p className="text-sm text-primary-300">TU Affiliated</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                A premier institution offering quality education in Bachelor of Business Studies (BBS) under Tribhuvan University affiliation. Building future business leaders since establishment.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-all"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-accent-400">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                    >
                      <HiArrowRight className="text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-accent-400">Our Programs</h4>
              <ul className="space-y-3">
                {programs.map((program) => (
                  <li key={program.name}>
                    <Link
                      to={program.path}
                      className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                    >
                      <HiArrowRight className="text-sm opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-accent-400">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    <HiLocationMarker className="text-accent-500 text-xl flex-shrink-0 mt-1" />
                    <span>Kathmandu Metropolitan City<br />Bagmati Province, Nepal</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+977-1-1234567"
                    className="flex items-center gap-3 text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    <HiPhone className="text-accent-500 text-xl" />
                    <span>+977-1-1234567</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@svcm.edu.np"
                    className="flex items-center gap-3 text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    <HiMail className="text-accent-500 text-xl" />
                    <span>info@svcm.edu.np</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} SVCM Campus. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Affiliated to</span>
              <span className="text-accent-400 font-semibold">Tribhuvan University</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
