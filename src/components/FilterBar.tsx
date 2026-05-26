import { Monitor, Smartphone, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import './FilterBar.css';

interface FilterBarProps {
  currentCategory: string;
  currentOrientation: string;
  onCategoryChange: (cat: string) => void;
  onOrientationChange: (ori: string) => void;
}

const CATEGORIES = ['All', 'Live Wallpapers', 'Nature', 'Abstract', 'Minimal', 'City', 'Space', 'Dark', 'Cyberpunk', 'Aesthetic', 'Neon'];

const FilterBar = ({ currentCategory, currentOrientation, onCategoryChange, onOrientationChange }: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="categories-scroll glass-panel">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {currentCategory === cat && (
              <motion.div
                layoutId="active-pill"
                className="active-pill-bg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="filter-text">{cat}</span>
          </button>
        ))}
      </div>
      
      <div className="device-filters glass-panel">
        <button
          className={`icon-btn ${currentOrientation === 'all' ? 'active' : ''}`}
          onClick={() => onOrientationChange('all')}
          title="All devices"
        >
          <LayoutGrid size={18} />
        </button>
        <button
          className={`icon-btn ${currentOrientation === 'landscape' ? 'active' : ''}`}
          onClick={() => onOrientationChange('landscape')}
          title="Desktop"
        >
          <Monitor size={18} />
        </button>
        <button
          className={`icon-btn ${currentOrientation === 'portrait' ? 'active' : ''}`}
          onClick={() => onOrientationChange('portrait')}
          title="Mobile"
        >
          <Smartphone size={18} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
