import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';
import logo from '../assets/images/logo.png';

const megaMenuData = {
  about: {
    ABOUT: [
      { name: 'ABOUT THE BRAND', link: '/about' },
      { name: 'STORES', link: '/stores' },
    ],
  },
  collections: {
    COLLECTIONS: [
      { name: 'WOMEN SPRING SUMMER 2026', link: '/shop/women-ss26' },
      { name: 'MEN SPRING SUMMER 2026', link: '/shop/men-ss26' },
    ],
    CAMPAIGNS: [
      { name: 'SPRING SUMMER 2026', link: '/campaign/ss26' },
    ],
  },
  women: {
    'READY TO WEAR': [
      { name: 'OUTERWEAR', link: '/shop/women?category=outerwear' },
      { name: 'JACKETS', link: '/shop/women?category=jackets' },
      { name: 'TOPS & T-SHIRTS', link: '/shop/women?category=tops' },
      { name: 'SHIRTS & BLOUSES', link: '/shop/women?category=shirts' },
      { name: 'KNITWEAR', link: '/shop/women?category=knitwear' },
      { name: 'DRESSES', link: '/shop/women?category=dresses' },
      { name: 'SKIRTS', link: '/shop/women?category=skirts' },
      { name: 'PANTS', link: '/shop/women?category=pants' },
      {
        name: 'SIGNATURE LEATHER',
        link: '/shop/women?category=signature-leather',
      },
      { name: 'ESSENTIAL', link: '/shop/women?category=essential' },
      { name: 'ALL', link: '/shop/women' },
    ],
    BAG: [
      { name: 'SINGULAR BAG', link: '/shop/women?category=bags&sub=singular' },
      {
        name: '21 LEATHER BUCKET BAG',
        link: '/shop/women?category=bags&sub=bucket',
      },
      { name: 'ALL', link: '/shop/women?category=bags' },
    ],
    SHOES: [{ name: 'ALL', link: '/shop/women?category=shoes' }],
    ACCESSORIES: [{ name: 'ALL', link: '/shop/women?category=accessories' }],
    'PREVIOUS SEASON': [{ name: 'ALL', link: '/shop/women?category=previous' }],
  },
  men: {
    'READY TO WEAR': [
      { name: 'OUTERWEAR', link: '/shop/men?category=outerwear' },
      { name: 'JACKETS', link: '/shop/men?category=jackets' },
      { name: 'TOPS & T-SHIRTS', link: '/shop/men?category=tops' },
      { name: 'SHIRTS', link: '/shop/men?category=shirts' },
      { name: 'KNITWEAR', link: '/shop/men?category=knitwear' },
      { name: 'PANTS', link: '/shop/men?category=pants' },
      {
        name: 'SIGNATURE LEATHER',
        link: '/shop/men?category=signature-leather',
      },
      { name: 'ESSENTIAL', link: '/shop/men?category=essential' },
      { name: 'ALL', link: '/shop/men' },
    ],
    BAG: [
      { name: 'SINGULAR BAG', link: '/shop/men?category=bags&sub=singular' },
      {
        name: '21 LEATHER BUCKET BAG',
        link: '/shop/men?category=bags&sub=bucket',
      },
      { name: 'ALL', link: '/shop/men?category=bags' },
    ],
    SHOES: [{ name: 'ALL', link: '/shop/men?category=shoes' }],
    ACCESSORIES: [{ name: 'ALL', link: '/shop/men?category=accessories' }],
    'PREVIOUS SEASON': [{ name: 'ALL', link: '/shop/men?category=previous' }],
  },
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const { cartCount } = useCart();

  const navLeft = [
    { label: 'WOMEN', key: 'women' },
    { label: 'MEN', key: 'men' },
    { label: 'ABOUT', key: 'about' },
    { label: 'COLLECTIONS', key: 'collections' },
  ];
  const navRight = ['SEARCH'];

  const closeMega = useCallback(() => setActiveMega(null), []);

  // Close on route change
  useEffect(() => {
    closeMega();
  }, [location, closeMega]);

  // Close on click outside
  useEffect(() => {
    if (!activeMega) return;
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeMega();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeMega, closeMega]);

  // Close on Escape
  useEffect(() => {
    if (!activeMega) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeMega();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeMega, closeMega]);

  const handleNavClick = (key, e) => {
    if (megaMenuData[key]) {
      e.preventDefault();
      setActiveMega((prev) => (prev === key ? null : key));
    }
  };

  const currentMenu = activeMega ? megaMenuData[activeMega] : null;

  return (
    <header className={styles.header} ref={headerRef}>
      <nav className={styles.nav}>
        {/* Desktop nav left */}
        <ul className={styles.navLeft}>
          {navLeft.map((item) => (
            <li key={item.key}>
              <a
                href="#!"
                className={`${styles.navLink} ${activeMega === item.key ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(item.key, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <line y1="0.5" x2="18" y2="0.5" stroke="currentColor" />
            <line y1="5.5" x2="18" y2="5.5" stroke="currentColor" />
            <line y1="10.5" x2="18" y2="10.5" stroke="currentColor" />
          </svg>
        </button>

        <Link
          to="/"
          className={styles.logo}
          onClick={() => {
            window.scrollTo({ top: 0 });
            document.querySelector('[class*="wrapper"]')?.scrollTo({ top: 0 });
          }}
        >
          <img src={logo} alt="RECTO" className={styles.logoImg} />
        </Link>

        {/* Desktop nav right */}
        <ul className={styles.navRight}>
          {navRight.map((item) => (
            <li key={item}>
              <a href="#!" className={styles.navLink}>
                {item}
              </a>
            </li>
          ))}
          <li>
            <Link to="/cart" className={styles.navLink}>
              CART{cartCount > 0 && `(${cartCount})`}
            </Link>
          </li>
          <li>
            <a href="#!" className={styles.navLink}>MY PAGE</a>
          </li>
        </ul>

        {/* Mobile icons */}
        <div className={styles.mobileIcons}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="10.5"
                y1="10.5"
                x2="15"
                y2="15"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1" />
              <path
                d="M5.5 4V3C5.5 1.5 6.5 0.5 8 0.5C9.5 0.5 10.5 1.5 10.5 3V4"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mega Menu */}
      <div className={`${styles.megaMenu} ${activeMega ? styles.megaOpen : ''}`}>
        {currentMenu && (
          <div className={styles.megaInner}>
            {Object.entries(currentMenu).map(([group, items]) => (
              <div key={group} className={styles.megaColumn}>
                <span className={styles.megaGroupTitle}>{group}</span>
                <ul className={styles.megaList}>
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.link}
                        className={styles.megaLink}
                        onClick={closeMega}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overlay */}
      {activeMega && <div className={styles.megaOverlay} onClick={closeMega} />}
    </header>
  );
}

export default Header;
