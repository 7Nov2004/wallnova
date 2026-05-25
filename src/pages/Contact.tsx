import './Page.css';

const Contact = () => {
  return (
    <div className="container page-container animate-fade-in">
      <div className="glass-panel page-content">
        <h1>Contact Us</h1>
        <p className="subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="john@example.com" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={5} placeholder="How can we help you?" required></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
