import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import SplitBanner from './components/SplitBanner';
import TheEditSection from './components/TheEditSection';
import MensEditSection from './components/MensEditSection';
import EyewearEditSection from './components/EyewearEditSection';
import Footer from './components/Footer';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import CollabPage from './pages/CollabPage';
import MyPage from './pages/MyPage';
import AboutPage from './pages/AboutPage';
import { banners, homeWomenProducts, homeMenProducts } from './data/mockData';

function HomePage() {
  const appRef = useRef(null);

  useEffect(() => {
    const el = appRef.current;
    if (!el) return;

    // 모바일에서는 scroll-snap 비활성화
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const sections = Array.from(el.querySelectorAll('section'));
    let isScrolling = false;

    // 저장된 섹션으로 복원
    const savedIdx = sessionStorage.getItem('homeSectionIdx');
    if (savedIdx && sections[Number(savedIdx)]) {
      sections[Number(savedIdx)].scrollIntoView();
    }

    const getCurrentIdx = () => {
      let closestIdx = 0;
      let closestDist = Infinity;
      sections.forEach((sec, i) => {
        const dist = Math.abs(sec.getBoundingClientRect().top);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      return closestIdx;
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      const idx = getCurrentIdx();
      const target = e.deltaY > 0 ? sections[idx + 1] : sections[idx - 1];
      if (!target) return;

      isScrolling = true;
      target.scrollIntoView({ behavior: 'smooth' });

      const nextIdx = e.deltaY > 0 ? idx + 1 : idx - 1;
      sessionStorage.setItem('homeSectionIdx', String(nextIdx));

      setTimeout(() => {
        isScrolling = false;
      }, 900);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="app" ref={appRef}>
      <Header />
      <main>
        {/* ── 섹션 1: Womenswear 배너 ── */}
        <SplitBanner {...banners[0]} />

        {/* ── THE EDIT (여성) ── */}
        <TheEditSection products={homeWomenProducts} />

        {/* ── 섹션 2: Menswear 배너 ── */}
        <SplitBanner {...banners[1]} />

        {/* ── THE EDIT (남성) ── */}
        <MensEditSection products={homeMenProducts} />

        {/* ── 섹션 3: EFFECTOR × RECTO 콜라보 배너 ── */}
        <SplitBanner {...banners[2]} />

        {/* ── THE EDIT (아이웨어) ── */}
        <EyewearEditSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/shop/:gender" element={<ShopPage />} />
      <Route path="/collab/effector" element={<CollabPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      </Routes>
    </WishlistProvider>
    </CartProvider>
  );
}

export default App;
