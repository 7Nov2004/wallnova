import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../store';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import { Wallpaper } from '../types';
import './Page.css'; // Reusing Page.css for standard layout
import { useSEO } from '../hooks/useSEO';

const Favorites = () => {
  useSEO({
    title: 'Your Favorites - WallNova',
    description: 'View and manage your saved and favorite wallpapers on WallNova.'
  });

  const favorites = useStore(state => state.favorites);
  const [selectedPhoto, setSelectedPhoto] = useState<Wallpaper | null>(null);

  return (
    <motion.div 
      className="container page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <Heart size={32} className="accent-icon" />
        <h1>Your Favorites</h1>
        <p className="text-secondary">{favorites.length} saved wallpapers</p>
      </div>

      {favorites.length > 0 ? (
        <WallpaperGrid 
          photos={favorites} 
          loading={false}
          onPhotoClick={setSelectedPhoto}
          hasMore={false}
          loadMore={() => {}}
        />
      ) : (
        <div className="empty-state glass-panel">
          <Heart size={48} className="text-secondary mb-4" />
          <h3>No favorites yet</h3>
          <p className="text-secondary">Start exploring and save your favorite wallpapers here.</p>
        </div>
      )}

      <PreviewModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </motion.div>
  );
};

export default Favorites;
