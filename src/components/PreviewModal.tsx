import { useEffect, useState } from 'react';
import { PexelsPhoto } from '../api/pexels';
import { X, Download, Camera, Image as ImageIcon, Heart, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import './PreviewModal.css';

const WhatsappIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#25D366'}}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#1877F2'}}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#1DA1F2'}}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const PinterestIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#E60023'}}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.65 7.91 6.33 9.4-.11-.78-.2-1.98.04-2.84l1.34-5.69s-.35-.69-.35-1.72c0-1.61.94-2.82 2.1-2.82 1.01 0 1.5.76 1.5 1.67 0 1.01-.64 2.53-.98 3.94-.28 1.18.59 2.15 1.76 2.15 2.1 0 3.72-2.22 3.72-5.42 0-2.85-2.05-4.85-4.99-4.85-3.4 0-5.39 2.55-5.39 5.17 0 1.02.39 2.12.89 2.71.1.12.11.23.08.35l-.29 1.18c-.04.16-.14.19-.3.12-1.12-.53-1.83-2.18-1.83-3.52 0-2.86 2.08-5.49 6.01-5.49 3.16 0 5.61 2.25 5.61 5.25 0 3.14-1.98 5.67-4.73 5.67-1.18 0-2.29-.61-2.67-1.34l-.73 2.78c-.26.99-1 2.22-1.48 2.97 1.04.32 2.16.49 3.32.49 5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

interface PreviewModalProps {
  photo: PexelsPhoto | null;
  onClose: () => void;
}

const PreviewModal = ({ photo, onClose }: PreviewModalProps) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
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

  const getShareableLink = () => {
    if (!photo) return window.location.href;
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?photo=${photo.id}`;
  };

  const handleCopyLink = () => {
    if (photo) {
      navigator.clipboard.writeText(getShareableLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareUrl = encodeURIComponent(getShareableLink());
  const shareText = encodeURIComponent('Check out this awesome wallpaper from WallNova!');

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
                    
                    <button className="secondary-action-btn" onClick={handleNativeShare}>
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div 
                        className="share-menu"
                        initial={{ opacity: 0, height: 0, marginTop: -16 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                        exit={{ opacity: 0, height: 0, marginTop: -16 }}
                      >
                        <div className="share-menu-header">
                          <span className="share-menu-title">Share to</span>
                          <button className="close-btn-small" onClick={() => setShowShareMenu(false)}>
                            <X size={16} />
                          </button>
                        </div>
                        <div className="share-options-grid">
                          <a href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`} target="_blank" rel="noreferrer" className="share-btn">
                            <div className="share-icon-wrapper"><WhatsappIcon /></div>
                            <span className="share-btn-text">WhatsApp</span>
                          </a>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="share-btn">
                            <div className="share-icon-wrapper"><FacebookIcon /></div>
                            <span className="share-btn-text">Facebook</span>
                          </a>
                          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noreferrer" className="share-btn">
                            <div className="share-icon-wrapper"><TwitterIcon /></div>
                            <span className="share-btn-text">Twitter</span>
                          </a>
                          <a href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${photo?.src.large2x}&description=${shareText}`} target="_blank" rel="noreferrer" className="share-btn">
                            <div className="share-icon-wrapper"><PinterestIcon /></div>
                            <span className="share-btn-text">Pinterest</span>
                          </a>
                          <button onClick={handleCopyLink} className="share-btn">
                            <div className="share-icon-wrapper">
                              {copied ? <Check size={20} color="var(--success)" /> : <Share2 size={20} />}
                            </div>
                            <span className="share-btn-text">{copied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
