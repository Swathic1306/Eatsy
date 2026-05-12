import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/menu', label: 'Menu', emoji: '🍽️' },
    { to: '/about', label: 'About Us', emoji: '❤️' },
    { to: '/contact', label: 'Contact', emoji: '📞' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">🍕</span>
          <span className="logo-text">
            <span className="logo-main">Eatsy</span>
            <span className="logo-sub">Eat Easy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              <span className="nav-emoji">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="header-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>

          {user ? (
            <div className="user-menu">
              <div className="user-avatar">{user.name[0].toUpperCase()}</div>
              <div className="user-dropdown">
                <span className="user-name">Hey, {user.name.split(' ')[0]}! 👋</span>
                <Link to="/orders" className="dropdown-link">📦 My Orders</Link>
                <button className="dropdown-link logout-btn" onClick={handleLogout}>🚪 Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Sign In 🙋
            </Link>
          )}

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link-mobile ${location.pathname === link.to ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.emoji} {link.label}
          </Link>
        ))}
        {!user && (
          <Link to="/login" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Sign In 🙋
          </Link>
        )}
      </nav>
    </header>
  );
}