import { useEffect } from 'react';
import { PexelsPhoto } from '../api/pexels';
import { X, Download, Camera, Image as ImageIcon } from 'lucide-react';
import './PreviewModal.css';

interface PreviewModalProps {
  photo: PexelsPhoto | null;
  onClose: () => void;
}

const PreviewModal = ({ photo, onClose }: PreviewModalProps) => {
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

  if (!photo) return null;

  const handleDownload = async () => {
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
    } catch (error) {
      // Fallback
      window.open(photo.src.original, '_blank');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-body">
          <div className="preview-image-container">
            <img 
              src={photo.src.large2x} 
              alt={photo.alt || 'Wallpaper Preview'} 
              className="preview-image"
            />
          </div>
          
          <div className="modal-info">
            <div className="meta-details">
              <h2>Photo Details</h2>
              <p className="meta-item">
                <Camera size={18} />
                <a href={photo.photographer_url} target="_blank" rel="noreferrer" className="photographer-link">
                  {photo.photographer}
                </a>
              </p>
              <p className="meta-item">
                <ImageIcon size={18} />
                <span>{photo.width} x {photo.height}</span>
              </p>
              {photo.alt && (
                <p className="meta-alt">{photo.alt}</p>
              )}
            </div>
            
            <button className="btn btn-primary download-btn" onClick={handleDownload}>
              <Download size={20} />
              Download Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
