import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice, totalItems, isCartOpen, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to place an order!', { icon: '🔐' });
      setIsCartOpen(false);
      navigate('/login');
      return;
    }
    try {
      await axios.post('/api/orders', {
        items: cart.map(i => ({ menuItemId: i.id, name: i.name, price: i.price, quantity: i.qty, emoji: i.emoji, isVeg: i.isVeg })),
        totalAmount: totalPrice,
        deliveryAddress: 'Home',
        paymentMethod: 'COD'
      });
      clearCart();
      setIsCartOpen(false);
      toast.success('🎉 Order placed successfully! Hang tight, food is on the way!', {
        duration: 4000,
        style: { background: '#1a0a00', color: '#fff', borderRadius: '12px' }
      });
    } catch {
      toast.error('Please connect to backend to place orders. Cart works offline! 🛒');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart 🛒</h2>
          <div className="cart-header-right">
            {cart.length > 0 && (
              <button className="clear-btn" onClick={clearCart}>Clear all</button>
            )}
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-emoji">🍽️</div>
            <h3>Your cart is empty!</h3>
            <p>Add some delicious items from our menu 😋</p>
            <button className="btn btn-primary" onClick={() => { setIsCartOpen(false); navigate('/menu'); }}>
              Browse Menu 🍕
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-emoji">{item.emoji}</div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{item.price} each</div>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item-total">₹{item.price * item.qty}</div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-delivery">FREE 🎉</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                Place Order — ₹{totalPrice} 🍕
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}