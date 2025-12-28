import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiChevronRight } from 'react-icons/hi';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/' || location.pathname === '/admin/login') return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-100 py-3">
      <div className="container-custom">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="flex items-center hover:text-primary-600 transition-colors">
              <HiHome className="w-4 h-4 mr-1" />
              <span>Home</span>
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            // Clean up the display name (e.g., replace hyphens with spaces, capitalize)
            let displayName = value.replace(/-/g, ' ');
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

            // Skip 'page' or 'blog' from the breadcrumb if it's not the last part
            if ((value === 'page' || value === 'blog') && !last) return null;

            return (
              <li key={to} className="flex items-center">
                <HiChevronRight className="w-4 h-4 mx-1 flex-shrink-0" />
                {last ? (
                  <span className="font-semibold text-primary-700 truncate max-w-[200px] md:max-w-none">
                    {displayName}
                  </span>
                ) : (
                  <Link to={to} className="hover:text-primary-600 transition-colors capitalize">
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
