import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './EyewearEditSection.module.css';
import { eyewearProducts } from '../data/mockData';

function EyewearCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: product.bg }}
    >
      <img className={styles.productImage} src={product.imageUrl} alt={product.name} />
      <div className={`${styles.hoverOverlay} ${hovered ? styles.hoverVisible : ''}`}>
        <p className={styles.hoverName}>{product.name}</p>
        <p className={styles.hoverPrice}>{product.price.toLocaleString()} {product.currency}</p>
      </div>
    </Link>
  );
}

function EyewearEditSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && activeIndex < eyewearProducts.length - 1) setActiveIndex((i) => i + 1);
    if (diff < -50 && activeIndex > 0) setActiveIndex((i) => i - 1);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>THE EDIT</h2>
        <a href="#!" className={styles.viewAll}>view all</a>
      </div>

      {/* Desktop grid */}
      <div className={styles.grid}>
        {eyewearProducts.map((product) => (
          <EyewearCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile carousel */}
      <div
        className={styles.carousel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(calc(-${activeIndex} * 80%))` }}
        >
          {eyewearProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className={styles.carouselSlide}>
              <div className={styles.slideImageWrap} style={{ background: product.bg }}>
                <img src={product.imageUrl} alt={product.name} className={styles.slideImage} />
              </div>
              <div className={styles.slideMeta}>
                <p className={styles.slideName}>{product.name}</p>
                <p className={styles.slideColor}>({product.color})</p>
                <p className={styles.slidePrice}>{product.price.toLocaleString()} {product.currency}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.dots}>
          {eyewearProducts.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EyewearEditSection;
