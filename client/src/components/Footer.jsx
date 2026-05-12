import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🍕</span>
              <div>
                <div className="footer-logo-main">Eatsy</div>
                <div className="footer-logo-sub">Eat Easy</div>
              </div>
            </div>
            <p className="footer-tagline">
              We believe great food should reach everyone. Crafted with love, served with speed. 🚀
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">📸</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="Facebook">👥</a>
              <a href="#" className="social-link" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4>🍽️ Explore</h4>
            <Link to="/menu">Our Menu</Link>
            <Link to="/menu">Today's Specials</Link>
            <Link to="/menu">Veg Delights</Link>
            <Link to="/menu">Non-Veg Feast</Link>
          </div>

          <div className="footer-col">
            <h4>🏢 Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>

          <div className="footer-col">
            <h4>🔒 Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} <strong>Eatsy</strong> — Made with ❤️ and lots of 🍕 | All rights reserved.
          </p>
          <p className="footer-quote">
            "The secret ingredient is always love." 💕
          </p>
        </div>
      </div>
    </footer>
  );
}