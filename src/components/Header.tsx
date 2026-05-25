import { Link } from 'react-router-dom';
import { Aperture, Heart, User, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';
import SearchBar from './SearchBar';
import './Header.css';

const Header = () => {
  const theme = useStore(state => state.theme);
  const toggleTheme = useStore(state => state.toggleTheme);

  return (
    <header className="header glass">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Aperture size={32} className="logo-icon" />
          <span className="text-gradient">WallNova</span>
        </Link>
        
        {/* Only show SearchBar in header if not on home page, or if we want it everywhere we can keep it.
            Actually, the user asked for a floating glass search bar. Keeping it in the header is standard Apple-like. */}
        <div className="header-search-wrapper">
           <SearchBar />
        </div>

        <nav className="header-actions">
          <button onClick={toggleTheme} className="btn-icon" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/favorites" className="btn-icon" title="Favorites">
            <Heart size={20} />
          </Link>
          <Link to="/profile" className="btn-icon" title="Profile">
            <User size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
