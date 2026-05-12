import { useState } from 'react';
import { menuData } from '../data/menuData';
import { useCart } from '../context/CartContext';
import './Menu.css';

const CONTINENTALS = ['indian', 'chinese', 'italian'];
const CATEGORIES = ['starters', 'meals', 'desserts', 'juices'];

const categoryLabels = {
  starters: { label: 'Starters', emoji: '🥗' },
  meals: { label: 'Main Course', emoji: '🍽️' },
  desserts: { label: 'Desserts', emoji: '🍰' },
  juices: { label: 'Drinks & Juices', emoji: '🥤' },
};

const continentalLabels = {
  indian: { label: 'Indian', emoji: '🇮🇳', desc: 'Spices, curries & tandoor magic' },
  chinese: { label: 'Chinese', emoji: '🥢', desc: 'Wok-tossed Indo-Chinese flavours' },
  italian: { label: 'Italian', emoji: '🇮🇹', desc: 'Pizzas, pastas & gelatos' },
};

function MenuItemCard({ item, isVeg }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...item, isVeg });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={`menu-card ${added ? 'added' : ''}`}>
      <div className="menu-card-top">
        <div className="menu-veg-indicator" title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
          <div className={`veg-dot ${isVeg ? 'veg' : 'nonveg'}`} />
        </div>
        {item.tag && <span className="menu-tag">{item.tag}</span>}
        <div className="menu-emoji">{item.emoji}</div>
      </div>
      <div className="menu-card-body">
        <h3 className="menu-name">{item.name}</h3>
        <p className="menu-desc">{item.desc}</p>
        {item.cal && <span className="menu-cal">🔥 {item.cal}</span>}
      </div>
      <div className="menu-card-footer">
        <span className="menu-price">₹{item.price}</span>
        <button
          className={`btn btn-primary add-btn ${added ? 'added-state' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ Added!' : '+ Add'}
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [dietType, setDietType] = useState(null); // 'veg' | 'nonveg'
  const [continental, setContinental] = useState(null);
  const [activeCategory, setActiveCategory] = useState('starters');
  const [search, setSearch] = useState('');

  const menuItems = dietType && continental
    ? (menuData[dietType]?.[continental]?.[activeCategory] || [])
    : [];

  const filteredItems = search
    ? menuItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    : menuItems;

  const reset = () => { setDietType(null); setContinental(null); };

  return (
    <div className="menu-page page-enter">
      {/* Banner */}
      <div className="menu-banner">
        <h1>Our Menu 🍽️</h1>
        <p>Fresh ingredients. Bold flavours. Happy bellies.</p>
        {(dietType || continental) && (
          <button className="reset-btn" onClick={reset}>← Start Over</button>
        )}
      </div>

      {/* Step 1: Diet Type */}
      {!dietType && (
        <section className="menu-step">
          <div className="step-inner">
            <div className="step-label">Step 1 of 3</div>
            <h2>What are you in the mood for? 🤔</h2>
            <div className="diet-cards">
              <button className="diet-card veg-card" onClick={() => setDietType('veg')}>
                <div className="diet-icon">🌿</div>
                <div className="diet-indicator">
                  <div className="veg-dot veg" />
                </div>
                <h3>Vegetarian</h3>
                <p>Fresh, flavourful & completely plant-based options</p>
                <span className="diet-count">30+ items</span>
              </button>
              <button className="diet-card nonveg-card" onClick={() => setDietType('nonveg')}>
                <div className="diet-icon">🍗</div>
                <div className="diet-indicator">
                  <div className="veg-dot nonveg" />
                </div>
                <h3>Non-Vegetarian</h3>
                <p>Juicy meats, seafood & poultry — for the carnivores</p>
                <span className="diet-count">25+ items</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Continental */}
      {dietType && !continental && (
        <section className="menu-step">
          <div className="step-inner">
            <div className="step-label">Step 2 of 3 — {dietType === 'veg' ? '🌿 Vegetarian' : '🍗 Non-Veg'}</div>
            <h2>Pick your cuisine 🌍</h2>
            <div className="continental-cards">
              {CONTINENTALS.map(c => (
                <button key={c} className="continental-card" onClick={() => setContinental(c)}>
                  <div className="continental-emoji">{continentalLabels[c].emoji}</div>
                  <h3>{continentalLabels[c].label}</h3>
                  <p>{continentalLabels[c].desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Browse items */}
      {dietType && continental && (
        <section className="menu-browse page-enter">
          <div className="browse-header">
            <div className="browse-path">
              <button className="path-btn" onClick={reset}>{dietType === 'veg' ? '🌿' : '🍗'}</button>
              <span>›</span>
              <button className="path-btn" onClick={() => setContinental(null)}>{continentalLabels[continental].emoji} {continentalLabels[continental].label}</button>
              <span>›</span>
              <span className="path-current">{categoryLabels[activeCategory].emoji} {categoryLabels[activeCategory].label}</span>
            </div>

            {/* Search */}
            <div className="menu-search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button onClick={() => setSearch('')}>✕</button>}
            </div>
          </div>

          {/* Category tabs */}
          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat); setSearch(''); }}
              >
                {categoryLabels[cat].emoji} {categoryLabels[cat].label}
                <span className="cat-count">
                  {menuData[dietType]?.[continental]?.[cat]?.length || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="items-section">
            <div className="items-grid">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <MenuItemCard key={item.id} item={item} isVeg={dietType === 'veg'} />
                ))
              ) : (
                <div className="no-items">
                  <div className="no-items-emoji">🤷</div>
                  <h3>{search ? `No "${search}" found` : 'No items here yet'}</h3>
                  <p>{search ? 'Try a different search term' : 'Check another category!'}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}