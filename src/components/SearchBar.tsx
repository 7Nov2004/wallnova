import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Clock, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useDebounce } from '../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLFormElement>(null);
  
  const searchHistory = useStore(state => state.searchHistory);
  const addSearchHistory = useStore(state => state.addSearchHistory);
  
  const debouncedQuery = useDebounce(query, 500);

  const trendingSearches = ['Abstract', 'Nature', 'Dark', 'Minimalist', 'Neon'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search while typing effect
  useEffect(() => {
    if (debouncedQuery.trim() && isFocused) {
      navigate(`/?search=${encodeURIComponent(debouncedQuery)}`, { replace: true });
    } else if (!debouncedQuery.trim() && isFocused) {
      navigate('/', { replace: true });
    }
  }, [debouncedQuery]);

  const handleSearch = (e?: React.FormEvent, searchVal?: string) => {
    if (e) e.preventDefault();
    const finalQuery = searchVal || query;
    if (finalQuery.trim()) {
      addSearchHistory(finalQuery);
      setQuery(finalQuery);
      setIsFocused(false);
      navigate(`/?search=${encodeURIComponent(finalQuery)}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    navigate('/');
  };

  return (
    <form ref={searchRef} className={`search-container ${isFocused ? 'focused' : ''}`} onSubmit={handleSearch}>
      <div className="search-input-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search premium wallpapers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query && (
          <button type="button" className="clear-btn" onClick={clearSearch}>
            <X size={16} />
          </button>
        )}
        <button type="button" className="voice-btn" title="Voice Search (Demo)">
          <Mic size={18} />
        </button>
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div 
            className="search-dropdown glass-panel"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {searchHistory.length > 0 && (
              <div className="search-section">
                <h4>Recent</h4>
                <ul>
                  {searchHistory.map((item, i) => (
                    <li key={i} onClick={() => handleSearch(undefined, item)}>
                      <Clock size={16} className="text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="search-section">
              <h4>Trending</h4>
              <ul>
                {trendingSearches.map((item, i) => (
                  <li key={i} onClick={() => handleSearch(undefined, item)}>
                    <TrendingUp size={16} className="accent-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default SearchBar;
