import { PexelsPhoto } from '../api/pexels';
import { Download, Maximize2 } from 'lucide-react';
import './WallpaperCard.css';

interface WallpaperCardProps {
  photo: PexelsPhoto;
  onClick: (photo: PexelsPhoto) => void;
}

const WallpaperCard = ({ photo, onClick }: WallpaperCardProps) => {
  return (
    <div 
      className="wallpaper-card" 
      onClick={() => onClick(photo)}
      style={{ backgroundColor: photo.avg_color }}
    >
      <img
        src={photo.src.large}
        alt={photo.alt || 'Wallpaper'}
        className="wallpaper-image"
        loading="lazy"
      />
      <div className="wallpaper-overlay">
        <div className="wallpaper-info">
          <p className="photographer">{photo.photographer}</p>
        </div>
        <div className="wallpaper-actions">
          <button className="action-btn" title="Expand">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
