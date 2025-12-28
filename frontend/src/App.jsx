import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Breadcrumbs from './components/common/Breadcrumbs';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import CMSPage from './pages/CMSPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import BlogsManagement from './pages/admin/BlogsManagement';
// Checking viewed files... BlogsManagement was on line 23 in original.
import NoticesManagement from './pages/admin/NoticesManagement';
import AdmissionsManagement from './pages/admin/AdmissionsManagement';
import PagesManagement from './pages/admin/PagesManagement';
import MediaManagement from './pages/admin/MediaManagement';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Public Layout wrapper
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <Breadcrumbs />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/admission" element={<PublicLayout><Admission /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              
              {/* Dynamic Blog & CMS Routes */}
              <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />
              <Route path="/page/:slug" element={<PublicLayout><CMSPage /></PublicLayout>} />

              {/* Admin Login (public) */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'editor']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="blogs" element={<BlogsManagement />} />
                  <Route path="notices" element={<NoticesManagement />} />
                  <Route path="admissions" element={<AdmissionsManagement />} />
                  <Route path="pages" element={<PagesManagement />} />
                  <Route path="media" element={<MediaManagement />} />
                </Route>
              </Route>
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
