import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quotes, floatingFoods } from '../data/menuData';
import './Home.css';

const featuredItems = [
  { emoji: '🍕', name: 'Margherita Pizza', price: 349, tag: 'Italian', desc: 'Classic Neapolitan perfection' },
  { emoji: '🍗', name: 'Butter Chicken', price: 329, tag: 'Indian', desc: 'Creamy tomato-butter heaven' },
  { emoji: '🍜', name: 'Hakka Noodles', price: 169, tag: 'Chinese', desc: 'Wok-tossed spicy perfection' },
  { emoji: '🥟', name: 'Chicken Dumplings', price: 199, tag: 'Chinese', desc: 'Steamed pillowy goodness' },
  { emoji: '🧀', name: 'Paneer Tikka', price: 199, tag: 'Indian', desc: 'Smoky tandoor marinated cubes' },
  { emoji: '🍝', name: 'Pasta Arrabbiata', price: 299, tag: 'Italian', desc: 'Spicy tomato garlic pasta' },
];

const stats = [
  { value: '50+', label: 'Menu Items', emoji: '🍽️' },
  { value: '10K+', label: 'Happy Customers', emoji: '😊' },
  { value: '30 min', label: 'Avg Delivery', emoji: '🚀' },
  { value: '4.9 ⭐', label: 'Rating', emoji: '' },
];

export default function Home() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % quotes.length);
        setAnimating(false);
      }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-food-bg">
          {floatingFoods.slice(0, 10).map((food, i) => (
            <div
              key={i}
              className="hero-floating-food"
              style={{
                left: `${(i * 11 + 2) % 92}%`,
                top: `${(i * 9 + 4) % 85}%`,
                fontSize: `${food.size * 0.7}px`,
                animationDuration: `${food.duration + 2}s`,
                animationDelay: `${food.delay}s`,
              }}
            >
              {food.emoji}
            </div>
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span>🔥 50% OFF on First Order</span>
          </div>
          <h1 className="hero-title">
            Hungry? <br />
            <span className="hero-title-accent">We've Got You. 🍕</span>
          </h1>
          <p className="hero-sub">
            From spicy Indian curries to cheesy Italian pizzas — order fresh, hot, and fast.
            <br />No hunger left behind!
          </p>
          <div className="hero-cta">
            <Link to="/menu" className="btn btn-primary hero-btn">
              🍽️ Explore Menu
            </Link>
            <Link to="/about" className="btn btn-secondary hero-btn">
              ❤️ Our Story
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-plate">🍽️</div>
          <div className="orbit-item orbit-1">🍕</div>
          <div className="orbit-item orbit-2">🍔</div>
          <div className="orbit-item orbit-3">🌮</div>
          <div className="orbit-item orbit-4">🍣</div>
          <div className="orbit-item orbit-5">🧆</div>
        </div>
      </section>

      {/* Quote Slider */}
      <section className="quote-section">
        <div className="quote-track-wrapper">
          <div className={`quote-display ${animating ? 'fade-out' : 'fade-in'}`}>
            <span className="quote-food-emoji">{quotes[quoteIdx].emoji}</span>
            <blockquote className="quote-text">"{quotes[quoteIdx].text}"</blockquote>
          </div>
          <div className="quote-dots">
            {quotes.map((_, i) => (
              <button
                key={i}
                className={`quote-dot ${i === quoteIdx ? 'active' : ''}`}
                onClick={() => setQuoteIdx(i)}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Infinite scroll marquee */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...Array(3)].flatMap(() =>
              ['🍕 Pizza', '🍔 Burger', '🌮 Tacos', '🍜 Noodles', '🍣 Sushi', '🥗 Salad', '🍛 Curry', '🍰 Desserts', '🥟 Dumplings', '🧆 Falafel']
            ).map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.emoji} {s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="featured-section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">🌟 Fan Favourites</h2>
            <p className="section-sub">Dishes our customers can't stop ordering</p>
          </div>
          <div className="featured-grid">
            {featuredItems.map((item, i) => (
              <div className="featured-card" key={i}>
                <div className="featured-emoji">{item.emoji}</div>
                <div className="featured-tag">{item.tag}</div>
                <h3 className="featured-name">{item.name}</h3>
                <p className="featured-desc">{item.desc}</p>
                <div className="featured-footer">
                  <span className="featured-price">₹{item.price}</span>
                  <Link to="/menu" className="btn btn-primary featured-btn">Order →</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/menu" className="btn btn-primary">
              🍕 View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="why-section">
        <div className="section-inner">
          <h2 className="section-title text-center">Why Choose Foodie? 🤔</h2>
          <div className="why-grid">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Average delivery in 30 minutes or less. We know you\'re hungry!' },
              { icon: '👨‍🍳', title: 'Chef-Quality Food', desc: 'Every dish made by experienced chefs using the freshest ingredients.' },
              { icon: '💰', title: 'Best Prices', desc: 'Great food doesn\'t have to break the bank. We promise unbeatable value.' },
              { icon: '🌱', title: 'Fresh Always', desc: 'No frozen shortcuts. Every ingredient sourced fresh every single day.' },
            ].map((w, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-inner">
          <h2>Ready to Order? 🚀</h2>
          <p>Join 10,000+ happy foodies. First order gets 50% off!</p>
          <Link to="/menu" className="btn btn-primary cta-main-btn">
            🍕 Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}