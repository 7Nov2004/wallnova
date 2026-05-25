import { useEffect, useState } from 'react';
import { PexelsPhoto } from '../api/pexels';
import { X, Download, Camera, Image as ImageIcon, Heart, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import './PreviewModal.css';

interface PreviewModalProps {
  photo: PexelsPhoto | null;
  onClose: () => void;
}

const PreviewModal = ({ photo, onClose }: PreviewModalProps) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const toggleFavorite = useStore(state => state.toggleFavorite);
  const favorites = useStore(state => state.favorites);
  const addDownload = useStore(state => state.addDownload);

  const isFavorite = photo ? favorites.some(f => f.id === photo.id) : false;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    if (photo) document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [photo, onClose]);

  const handleDownload = async () => {
    if (!photo) return;
    setIsDownloading(true);
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
      window.open(photo.src.original, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    if (photo) {
      navigator.clipboard.writeText(photo.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content glass-panel" 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
            
            <div className="modal-body">
              <div className="preview-image-container" style={{ backgroundColor: photo.avg_color }}>
                <img 
                  src={photo.src.large2x} 
                  alt={photo.alt || 'Wallpaper Preview'} 
                  className="preview-image"
                />
              </div>
              
              <div className="modal-info">
                <div className="meta-details">
                  <h2>Wallpaper Details</h2>
                  
                  <div className="author-card">
                    <div className="author-avatar">
                      <Camera size={20} />
                    </div>
                    <div className="author-info">
                      <p className="author-label">Photographer</p>
                      <a href={photo.photographer_url} target="_blank" rel="noreferrer" className="photographer-link">
                        {photo.photographer}
                      </a>
                    </div>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <ImageIcon size={18} className="text-secondary" />
                      <div>
                        <p className="info-label">Resolution</p>
                        <p className="info-value">{photo.width} x {photo.height}</p>
                      </div>
                    </div>
                  </div>

                  <div className="action-row">
                    <button 
                      className={`secondary-action-btn ${isFavorite ? 'active-fav' : ''}`}
                      onClick={() => toggleFavorite(photo)}
                    >
                      <Heart size={20} fill={isFavorite ? 'var(--danger)' : 'transparent'} color={isFavorite ? 'var(--danger)' : 'currentColor'} />
                      <span>{isFavorite ? 'Saved' : 'Save'}</span>
                    </button>
                    
                    <button className="secondary-action-btn" onClick={handleCopyLink}>
                      {copied ? <Check size={20} color="var(--success)" /> : <Share2 size={20} />}
                      <span>{copied ? 'Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary download-btn" 
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  <Download size={20} />
                  {isDownloading ? 'Downloading...' : 'Download Original Free'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;
