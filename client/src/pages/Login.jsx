import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { floatingFoods } from '../data/menuData';
import toast from 'react-hot-toast';
import './Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        toast.success('Welcome back! 🎉 Ready to order some deliciousness?');
      } else {
        await register(form.name, form.email, form.password);
        toast.success(`Welcome to Foodie, ${form.name}! 🍕 Let's eat!`);
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated food background */}
      <div className="food-bg">
        {floatingFoods.map((food, i) => (
          <div
            key={i}
            className="floating-food"
            style={{
              left: `${(i * 7.1 + 3) % 95}%`,
              top: `${(i * 11.3 + 5) % 90}%`,
              fontSize: `${food.size}px`,
              animationDuration: `${food.duration}s`,
              animationDelay: `${food.delay}s`,
              opacity: 0.12 + (i % 4) * 0.05
            }}
          >
            {food.emoji}
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="login-overlay" />

      {/* Login card */}
      <div className="login-card-wrapper">
        <div className="login-card">
          {/* Logo */}
          <Link to="/" className="login-logo">
            <span>🍕</span>
            <span className="login-logo-text">Foodie</span>
          </Link>

          {/* Welcome text */}
          <div className="login-hero">
            <h1>{isLogin ? 'Welcome Back!' : 'Join the Feast!'}</h1>
            <p>{isLogin ? 'Sign in to order your favourite meals 🍔' : 'Create your account and start ordering 🎉'}</p>
          </div>

          {/* Toggle */}
          <div className="login-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="input-group" style={{ animation: 'fade-up 0.3s ease forwards' }}>
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required={!isLogin}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>

            {isLogin && (
              <div className="forgot-link">
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
              {loading ? (
                <span className="spinner">⏳</span>
              ) : (
                isLogin ? '🚀 Sign In & Order!' : '🎉 Create Account!'
              )}
            </button>
          </form>

          {/* Social login hint */}
          <div className="login-divider">
            <span>or continue with</span>
          </div>
          <div className="social-btns">
            <button className="social-btn" onClick={() => toast('Google sign-in coming soon! 🚧')}>
              🌐 Google
            </button>
            <button className="social-btn" onClick={() => toast('Phone login coming soon! 🚧')}>
              📱 Phone
            </button>
          </div>

          <p className="login-switch">
            {isLogin ? "New here? " : "Already have an account? "}
            <button className="switch-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create account 🎉' : 'Sign in instead →'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}