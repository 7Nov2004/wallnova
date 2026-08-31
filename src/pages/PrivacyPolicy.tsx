import './Page.css';
import { useSEO } from '../hooks/useSEO';

const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy - WallNova',
    description: 'Read the privacy policy of WallNova. Learn how we handle your data and respect your privacy.'
  });

  return (
    <div className="container page-container animate-fade-in">
      <div className="glass-panel page-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>
            At WallNova, we respect your privacy. As a wallpaper aggregator using the Pexels API, 
            we do not require you to create an account or provide personal information to use our service. 
            However, we may collect anonymous usage data to improve user experience.
          </p>
        </section>

        <section>
          <h2>2. How We Use Information</h2>
          <p>Any non-personal information collected is used solely for:</p>
          <ul>
            <li>Improving website performance and loading speeds.</li>
            <li>Analyzing popular wallpaper categories and search terms.</li>
            <li>Ensuring compatibility across different devices and browsers.</li>
          </ul>
        </section>

        <section>
          <h2>3. Third-Party Services</h2>
          <p>
            We use the Pexels API to fetch wallpapers. Pexels may collect data as outlined in their 
            respective Privacy Policy when you interact with the images fetched from their service.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            We may use essential cookies to remember your theme preferences (e.g., dark mode) 
            or recent searches. We do not use cookies for tracking or advertising purposes.
          </p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
