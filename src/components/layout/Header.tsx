import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Research', href: '/research' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-primary-600">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Admin Link - Only show when not loading */}
          {!loading && (
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="flex items-center text-gray-700 hover:text-primary-600 transition-colors duration-200"
                >
                  <Settings size={20} className="mr-1" />
                  Admin
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200"
                >
                  Admin Login
                </Link>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Admin Link */}
            {isAuthenticated ? (
              <Link
                to="/admin"
                className="block py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={20} className="inline mr-1" />
                Admin
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="block py-2 text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;