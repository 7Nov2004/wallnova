import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3 className="text-gradient">WallNova</h3>
          <p className="text-secondary" style={{ marginTop: '8px' }}>Premium wallpapers for your digital life.</p>
          <div style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Developed by <strong>Aayush Jaiwal</strong></p>
            <a href="mailto:aayush74550@gmail.com" style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none' }}>aayush74550@gmail.com</a>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WallNova by Aayush Jaiwal. All rights reserved.</p>
        <p>Photos provided by Pexels.</p>
      </div>
    </footer>
  );
};

export default Footer;
