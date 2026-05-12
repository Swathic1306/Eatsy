import './About.css';

const team = [
  { name: 'Arjun Sharma', role: 'Head Chef & Founder', emoji: '👨‍🍳', bio: 'Trained in Paris, loves dosas more than croissants. 20 years of culinary magic.' },
  { name: 'Priya Nair', role: 'Co-Founder & CEO', emoji: '👩‍💼', bio: 'Former food critic turned entrepreneur. If it isn\'t delicious, it isn\'t on the menu.' },
  { name: 'Rahul Patel', role: 'Head of Delivery', emoji: '🚴', bio: 'Ensures your food arrives hot, fast, and with a smile. Our secret weapon.' },
  { name: 'Meena Krishnan', role: 'Pastry Chef', emoji: '👩‍🍳', bio: 'Creates desserts so good, you\'ll want to order them as a main course.' },
];

const milestones = [
  { year: '2020', event: 'Foodie was born in a tiny Chennai kitchen 🍳', emoji: '🌱' },
  { year: '2021', event: 'Reached 1,000 happy customers milestone 🎉', emoji: '🏆' },
  { year: '2022', event: 'Expanded to 3 cuisines and 50+ dishes 🌍', emoji: '🚀' },
  { year: '2023', event: 'Won "Best Online Food Platform" — South India 🥇', emoji: '🏅' },
  { year: '2024', event: '10,000+ orders delivered with love ❤️', emoji: '💝' },
  { year: '2025', event: 'Launched Foodie App — Order Happiness, Anywhere! 📱', emoji: '📲' },
];

export default function About() {
  return (
    <div className="about-page page-enter">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story 📖</h1>
          <p className="about-lead">
            We started Foodie because we believed great food should come to you —
            not the other way around. Born in Chennai, dreaming big, feeding everyone.
          </p>
        </div>
        <div className="about-hero-visual">
          <div className="story-emoji">❤️</div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-inner">
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To bring restaurant-quality food to every doorstep with speed, love, and zero compromise on taste.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>A world where anyone, anywhere, can access the most delicious food with just a few taps.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">💎</div>
            <h3>Our Values</h3>
            <p>Freshness, speed, honesty, and — above all — making every meal feel like a celebration.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="section-inner-about">
          <h2>Our Journey 🗺️</h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot">{m.emoji}</div>
                <div className="timeline-card">
                  <div className="timeline-year">{m.year}</div>
                  <p>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="section-inner-about">
          <h2>Meet the Team 👋</h2>
          <p className="section-sub-about">The passionate humans behind every delicious bite</p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{member.emoji}</div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}