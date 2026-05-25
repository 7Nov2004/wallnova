import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>WallNova</h3>
          <p>Premium wallpapers for your digital life.</p>
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WallNova. All rights reserved.</p>
        <p>Photos provided by Pexels.</p>
      </div>
    </footer>
  );
};

export default Footer;
