import './FilterBar.css';
import { Monitor, Smartphone, LayoutGrid } from 'lucide-react';

interface FilterBarProps {
  currentCategory: string;
  currentOrientation: string;
  onCategoryChange: (cat: string) => void;
  onOrientationChange: (ori: string) => void;
}

const CATEGORIES = ['All', 'Nature', 'Abstract', 'Minimal', 'City', 'Space', 'Dark', 'Cyberpunk'];

const FilterBar = ({ currentCategory, currentOrientation, onCategoryChange, onOrientationChange }: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="categories-scroll">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="device-filters">
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
