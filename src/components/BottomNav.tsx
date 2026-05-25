import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/?search=trending', icon: Search, label: 'Discover' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav glass">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || 
                        (item.path === '/?search=trending' && location.search.includes('search'));

        return (
          <Link to={item.path} key={item.label} className={`nav-item ${isActive ? 'active' : ''}`}>
            <div className="nav-icon-wrapper">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="nav-active-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
