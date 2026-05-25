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
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading premium wallpapers...</p>
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
