import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Download, Clock } from 'lucide-react';
import { useStore } from '../store';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import { PexelsPhoto } from '../api/pexels';
import './Page.css'; 

const Profile = () => {
  const { user, login, logout, downloadHistory, clearSearchHistory } = useStore();
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsPhoto | null>(null);
  
  // Mock login state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login({ name, email });
    }
  };

  if (!user) {
    return (
      <motion.div 
        className="container page-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="login-form-container glass-panel">
          <div className="page-header text-center">
            <User size={32} className="accent-icon mx-auto" />
            <h2>Welcome Back</h2>
            <p className="text-secondary">Sign in to sync your preferences</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="John Doe" 
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="john@example.com" 
                className="input-field"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">Sign In</button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container page-container profile-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="profile-sidebar glass-panel">
        <div className="profile-user-info">
          <div className="avatar-large">{user.name.charAt(0).toUpperCase()}</div>
          <h3>{user.name}</h3>
          <p className="text-secondary">{user.email}</p>
        </div>
        
        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-value">{downloadHistory.length}</span>
            <span className="stat-label">Downloads</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-secondary w-full" onClick={clearSearchHistory}>
            <Clock size={18} /> Clear Search History
          </button>
          <button className="btn btn-danger w-full mt-4" onClick={logout}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="page-header mb-6">
          <Download size={24} className="accent-icon" />
          <h2>Download History</h2>
        </div>
        
        {downloadHistory.length > 0 ? (
          <WallpaperGrid 
            photos={downloadHistory} 
            loading={false}
            onPhotoClick={setSelectedPhoto}
            hasMore={false}
            loadMore={() => {}}
          />
        ) : (
          <div className="empty-state glass-panel">
            <Download size={48} className="text-secondary mb-4" />
            <h3>No downloads yet</h3>
            <p className="text-secondary">Wallpapers you download will appear here.</p>
          </div>
        )}
      </div>

      <PreviewModal 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </motion.div>
  );
};

export default Profile;
