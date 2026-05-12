import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Contexts (global state)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout components (always visible)
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import About from './pages/About';

// TODO: create these next
// import Contact from './pages/Contact';
// import Orders from './pages/Orders';
// import NotFound from './pages/NotFound';

export default function App() {
  return (
    // 1. BrowserRouter — enables URL-based navigation
    <BrowserRouter>

      {/* 2. AuthProvider — logged-in user state available everywhere */}
      <AuthProvider>

        {/* 3. CartProvider — cart state available everywhere */}
        <CartProvider>

          {/* 4. Toast notifications (react-hot-toast) */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                borderRadius: '12px',
              },
            }}
          />

          {/* 5. Header — always shown on every page */}
          <Header />

          {/* 6. Cart Drawer — slides in from right, always mounted */}
          <CartDrawer />

          {/* 7. Page routes */}
          <main style={{ paddingTop: '72px' }}>
            <Routes>
              <Route path="/"        element={<Home />} />
              <Route path="/login"   element={<Login />} />
              <Route path="/menu"    element={<Menu />} />
              <Route path="/about"   element={<About />} />

              {/* Uncomment as you build these pages: */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              {/* <Route path="/orders"  element={<Orders />} /> */}
              {/* <Route path="*"        element={<NotFound />} /> */}

              {/* Fallback redirect for unknown URLs */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* 8. Footer — always shown on every page */}
          <Footer />

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}