import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Aperture } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="header glass">
      <div className="container header-content">
        <Link to="/" className="logo">
          <Aperture size={28} className="logo-icon" />
          <span>WallNova</span>
        </Link>
        <form className="search-bar" onSubmit={handleSearch}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search premium wallpapers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
