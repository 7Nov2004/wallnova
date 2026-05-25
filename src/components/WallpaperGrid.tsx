import { PexelsPhoto } from '../api/pexels';
import WallpaperCard from './WallpaperCard';
import './WallpaperGrid.css';

interface WallpaperGridProps {
  photos: PexelsPhoto[];
  loading: boolean;
  onPhotoClick: (photo: PexelsPhoto) => void;
  hasMore: boolean;
  loadMore: () => void;
}

const WallpaperGrid = ({ photos, loading, onPhotoClick, hasMore, loadMore }: WallpaperGridProps) => {
  return (
    <div className="wallpaper-grid-container">
      <div className="masonry-grid">
        {photos.map((photo) => (
          <WallpaperCard key={photo.id} photo={photo} onClick={onPhotoClick} />
        ))}
      </div>
      
      {loading && (
        <div className="masonry-grid" style={{ marginTop: photos.length > 0 ? '24px' : '0' }}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={`skeleton-${i}`} 
              className="skeleton" 
              style={{ 
                height: `${Math.floor(Math.random() * (400 - 250 + 1) + 250)}px`, 
                borderRadius: 'var(--radius-lg)',
                marginBottom: '24px'
              }} 
            />
          ))}
        </div>
      )}

      {!loading && hasMore && photos.length > 0 && (
        <div className="load-more-container">
          <button className="btn btn-primary" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      
      {!loading && photos.length === 0 && (
        <div className="empty-state">
          <h2>No wallpapers found</h2>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default WallpaperGrid;
