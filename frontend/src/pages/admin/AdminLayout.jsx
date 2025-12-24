import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiHome, HiDocumentText, HiSpeakerphone, HiUserGroup, 
  HiCollection, HiPhotograph, HiLogout, HiMenuAlt2, HiX,
  HiCog, HiChartBar
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: HiChartBar, label: 'Dashboard' },
    { path: '/admin/blogs', icon: HiDocumentText, label: 'Blogs' },
    { path: '/admin/notices', icon: HiSpeakerphone, label: 'Notices' },
    { path: '/admin/admissions', icon: HiUserGroup, label: 'Admissions' },
    { path: '/admin/pages', icon: HiCollection, label: 'Pages' },
    { path: '/admin/media', icon: HiPhotograph, label: 'Media' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-primary-900 text-white transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-primary-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center font-bold text-primary-900">
              S
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg"
              >
                SVCM Admin
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-accent-500 text-primary-900 font-semibold'
                        : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="text-xl flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-primary-700">
          {sidebarOpen && (
            <div className="mb-4 px-2">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-sm text-primary-300 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-300 hover:bg-red-500/20 transition-all"
          >
            <HiLogout className="text-xl" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary-800 border-2 border-primary-600 flex items-center justify-center text-white hover:bg-primary-700"
        >
          {sidebarOpen ? '←' : '→'}
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-primary-900 text-white z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)}>
              <HiMenuAlt2 className="text-2xl" />
            </button>
            <span className="font-bold">SVCM Admin</span>
          </div>
          <button onClick={handleLogout}>
            <HiLogout className="text-xl" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 bg-primary-900 text-white z-50 overflow-y-auto"
            >
              <div className="p-4 flex justify-between items-center border-b border-primary-700">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <HiX className="text-2xl" />
                </button>
              </div>
              <nav className="py-4">
                <ul className="space-y-1 px-3">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-accent-500 text-primary-900 font-semibold'
                              : 'text-primary-200 hover:bg-primary-800'
                          }`
                        }
                      >
                        <item.icon className="text-xl" />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
