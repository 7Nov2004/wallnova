import './Page.css';

const Terms = () => {
  return (
    <div className="container page-container animate-fade-in">
      <div className="glass-panel page-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using WallNova, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2>2. Image Usage Rights</h2>
          <p>
            All wallpapers provided on this website are sourced from Pexels and are subject to the 
            Pexels License. You are free to use them for personal and commercial purposes, without 
            attribution (though attribution is appreciated). You cannot sell unaltered copies of a photo.
          </p>
        </section>

        <section>
          <h2>3. User Conduct</h2>
          <p>
            You agree not to use the service in any way that could damage, disable, overburden, or impair 
            the service or interfere with any other party's use of the service.
          </p>
        </section>

        <section>
          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The service is provided on an "as is" and "as available" basis. We make no warranties, 
            expressed or implied, regarding the accuracy, reliability, or availability of the images.
          </p>
        </section>

        <section>
          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the service 
            following any changes indicates your acceptance of the new terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
