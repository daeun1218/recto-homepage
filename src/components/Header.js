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
      { name: 'WOMEN SPRING SUMMER 2026', link: '/collection/women' },
      { name: 'MEN SPRING SUMMER 2026', link: '/collection/men' },
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
      { name: 'SINGULAR BAG', link: '/shop/women?category=singular-bag' },
      { name: '21 LEATHER BUCKET BAG', link: '/shop/women?category=bucket-bag' },
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
      { name: 'SINGULAR BAG', link: '/shop/men?category=singular-bag' },
      { name: '21 LEATHER BUCKET BAG', link: '/shop/men?category=bucket-bag' },
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
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const { cartCount } = useCart();

  const navLeft = [
    { label: 'EFFECTOR × RECTO', key: 'effector', link: '/collab/effector', bold: true },
    { label: 'WOMEN', key: 'women' },
    { label: 'MEN', key: 'men' },
    { label: 'COLLECTIONS', key: 'collections' },
  ];
  const navRight = [{ label: 'ABOUT', key: 'about' }, 'SEARCH'];

  const closeMega = useCallback(() => setActiveMega(null), []);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileAccordion(null);
  }, []);

  // Close on route change
  useEffect(() => {
    closeMega();
    closeMenu();
  }, [location, closeMega, closeMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
    if (!activeMega && !menuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        closeMega();
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [activeMega, menuOpen, closeMega, closeMenu]);

  const handleNavClick = (key, e) => {
    if (megaMenuData[key]) {
      e.preventDefault();
      setActiveMega((prev) => (prev === key ? null : key));
    }
  };

  const toggleMobileAccordion = (key) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  const currentMenu = activeMega ? megaMenuData[activeMega] : null;

  return (
    <header className={styles.header} ref={headerRef}>
      <nav className={styles.nav}>
        {/* Desktop nav left */}
        <ul className={styles.navLeft}>
          {navLeft.map((item) => (
            <li key={item.key}>
              {item.link ? (
                <Link
                  to={item.link}
                  className={`${styles.navLink} ${item.bold ? styles.navLinkBold : ''}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href="#!"
                  className={`${styles.navLink} ${activeMega === item.key ? styles.navLinkActive : ''}`}
                  onClick={(e) => handleNavClick(item.key, e)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={styles.menuBtn}
          onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1" />
            </svg>
          ) : (
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <line y1="0.5" x2="18" y2="0.5" stroke="currentColor" />
              <line y1="5.5" x2="18" y2="5.5" stroke="currentColor" />
              <line y1="10.5" x2="18" y2="10.5" stroke="currentColor" />
            </svg>
          )}
        </button>

        <Link
          to="/"
          className={styles.logo}
          onClick={() => {
            window.scrollTo({ top: 0 });
            document.querySelector('[class*="wrapper"]')?.scrollTo({ top: 0 });
            sessionStorage.removeItem('homeSectionIdx');
          }}
        >
          <img src={logo} alt="RECTO" className={styles.logoImg} />
        </Link>

        {/* Desktop nav right */}
        <ul className={styles.navRight}>
          {navRight.map((item) =>
            typeof item === 'object' ? (
              <li key={item.key}>
                <a
                  href="#!"
                  className={`${styles.navLink} ${activeMega === item.key ? styles.navLinkActive : ''}`}
                  onClick={(e) => handleNavClick(item.key, e)}
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={item}>
                <a href="#!" className={styles.navLink}>{item}</a>
              </li>
            )
          )}
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
        <div className={`${styles.mobileIcons} ${menuOpen ? styles.mobileIconsHidden : ''}`}>
          <Link to="/cart" className={styles.mobileCartLink}>
            CART{cartCount > 0 && `(${cartCount})`}
          </Link>
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

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerBody}>
          {navLeft.map((item) => (
            <div key={item.key} className={styles.drawerSection}>
              {item.link ? (
                <Link
                  to={item.link}
                  className={`${styles.drawerAccordionBtn} ${item.bold ? styles.drawerLinkBold : ''}`}
                  onClick={closeMenu}
                >
                  <span>{item.label}</span>
                </Link>
              ) : (
                <>
                  <button
                    className={styles.drawerAccordionBtn}
                    onClick={() => toggleMobileAccordion(item.key)}
                  >
                    <span>{item.label}</span>
                    <span className={styles.drawerAccordionIcon}>
                      {mobileAccordion === item.key ? '−' : '+'}
                    </span>
                  </button>
                  {mobileAccordion === item.key && megaMenuData[item.key] && (
                    <div className={styles.drawerAccordionBody}>
                      {Object.entries(megaMenuData[item.key]).map(([group, items]) => (
                        <div key={group} className={styles.drawerGroup}>
                          <span className={styles.drawerGroupTitle}>{group}</span>
                          <ul className={styles.drawerList}>
                            {items.map((link) => (
                              <li key={link.name}>
                                <Link
                                  to={link.link}
                                  className={styles.drawerLink}
                                  onClick={closeMenu}
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.drawerFooter}>
          <a href="#!" className={styles.drawerFooterLink}>SEARCH</a>
          <Link to="/cart" className={styles.drawerFooterLink} onClick={closeMenu}>
            CART{cartCount > 0 && ` (${cartCount})`}
          </Link>
          <a href="#!" className={styles.drawerFooterLink}>MY PAGE</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
