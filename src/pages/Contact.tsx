import { motion } from 'framer-motion';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import './Page.css';
import { useSEO } from '../hooks/useSEO';

const Contact = () => {
  useSEO({
    title: 'Contact Us - WallNova',
    description: 'Get in touch with the WallNova team. Have a question or feedback? We would love to hear from you.'
  });

  return (
    <motion.div 
      className="container page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="page-header text-center mb-6">
        <div className="icon-wrapper glass mb-4" style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(234, 67, 53, 0.1)' }}>
          <Mail size={40} color="#ea4335" /> {/* Google/Gmail Red color */}
        </div>
        <h1 className="text-gradient">Get in Touch</h1>
        <p className="text-secondary" style={{ maxWidth: '500px', margin: '0 auto' }}>
          Have a question or feedback? We'd love to hear from you. Fill out the form below or email Aayush directly.
        </p>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>
        
        {/* Contact Info Card */}
        <motion.div 
          className="glass-panel" 
          style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Contact Information</h3>
            <p className="text-secondary">Reach out to the developer directly.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="icon-btn" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent)' }}>
              <User size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Developer</p>
              <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Aayush Jaiwal</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="icon-btn" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#ea4335' }}>
              <Mail size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email Address</p>
              <a href="mailto:aayush74550@gmail.com" style={{ fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none' }}>
                aayush74550@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="glass-panel" 
          style={{ padding: '32px' }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <form 
            className="contact-form" 
            action="https://formsubmit.co/aayush74550@gmail.com" 
            method="POST"
          >
            {/* FormSubmit Config */}
            <input type="hidden" name="_subject" value="New message from Wallnova Contact Form!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input type="text" id="name" name="name" placeholder="Aayush Jaiwal" required style={{ paddingLeft: '48px' }} />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input type="email" id="email" name="email" placeholder="aayush74550@gmail.com" required style={{ paddingLeft: '48px' }} />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-secondary)' }} />
                <textarea id="message" name="message" rows={5} placeholder="How can we help you?" required style={{ paddingLeft: '48px' }}></textarea>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-full mt-4" style={{ padding: '16px' }}>
              <Send size={18} /> Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
