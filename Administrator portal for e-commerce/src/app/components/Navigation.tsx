import { Link, useLocation } from 'react-router-dom';
import { Coffee, Home, Plus, Package } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/add-product', label: 'Add Product', icon: Plus },
  ];

  return (
    <nav className="bg-amber-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:inline">Coffee R Us Admin</span>
            <span className="text-xl font-bold sm:hidden">Admin</span>
          </div>
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(path)
                    ? 'bg-amber-900 text-white'
                    : 'text-amber-100 hover:bg-amber-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
