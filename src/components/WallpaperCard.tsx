import { useState } from 'react';
import { PexelsPhoto } from '../api/pexels';
import { Maximize2, Heart, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import './WallpaperCard.css';

interface WallpaperCardProps {
  photo: PexelsPhoto;
  onClick: (photo: PexelsPhoto) => void;
}

const WallpaperCard = ({ photo, onClick }: WallpaperCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const toggleFavorite = useStore(state => state.toggleFavorite);
  const favorites = useStore(state => state.favorites);
  const addDownload = useStore(state => state.addDownload);
  
  const isFavorite = favorites.some(f => f.id === photo.id);

  const is4K = photo.width >= 3840;
  const isHD = photo.width >= 1920 && !is4K;
  
  // Basic heuristic for AMOLED (very dark avg color)
  const isAmoled = photo.avg_color.toLowerCase().match(/^#(00|01|02|03|04|05|06|07|08|09|1a|1b|1c)/);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(photo);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(photo.src.original);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wallnova-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      addDownload(photo);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  return (
    <motion.div 
      className="wallpaper-card" 
      onClick={() => onClick(photo)}
      style={{ backgroundColor: photo.avg_color }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      layout
    >
      {!imageLoaded && <div className="skeleton card-skeleton" />}
      
      <img
        src={photo.src.large}
        alt={photo.alt || 'Wallpaper'}
        className={`wallpaper-image ${imageLoaded ? 'loaded' : ''}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      
      {imageLoaded && (
        <>
          <div className="card-badges">
            {is4K && <span className="badge badge-4k">4K</span>}
            {isHD && <span className="badge badge-hd">HD</span>}
            {isAmoled && <span className="badge badge-amoled">AMOLED</span>}
          </div>

          <div className="wallpaper-overlay">
            <div className="wallpaper-info">
              <p className="photographer">{photo.photographer}</p>
            </div>
            <div className="wallpaper-actions">
              <button 
                className="action-btn" 
                onClick={handleFavorite} 
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={18} fill={isFavorite ? 'var(--danger)' : 'transparent'} color={isFavorite ? 'var(--danger)' : 'white'} />
              </button>
              <button className="action-btn" onClick={handleDownload} title="Quick Download">
                <Download size={18} />
              </button>
              <button className="action-btn" title="Expand">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default WallpaperCard;
