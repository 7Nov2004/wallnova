import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import { useStore } from './store';

// Lazy loaded pages for performance optimization
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const theme = useStore(state => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="page-wrapper">
        <Header />
        <main className="main-content">
          <Suspense fallback={<div className="container"><div className="skeleton" style={{ height: '50vh', marginTop: '2rem' }} /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
