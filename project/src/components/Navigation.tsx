import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'For Freelancers', id: 'freelancers' },
    ...(profile?.user_type === 'admin' ? [{ name: 'Admin Dashboard', id: 'admin' }] : []),
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="text-3xl font-bold text-teal-500">ReviewBoost</div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {profile?.user_type === 'freelancer' && (
                  <Button
                    onClick={() => onNavigate('dashboard')}
                    variant="outline"
                    size="sm"
                  >
                    Dashboard
                  </Button>
                )}
                <Button onClick={handleSignOut} variant="secondary" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  size="sm"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate('signup')}
                  variant="primary"
                  size="sm"
                >
                  Request Review
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  {profile?.user_type === 'freelancer' && (
                    <Button
                      onClick={() => {
                        onNavigate('dashboard');
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Dashboard
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate('signup');
                      setMobileMenuOpen(false);
                    }}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Request Review
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
