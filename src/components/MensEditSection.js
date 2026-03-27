import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './TheEditSection.module.css';

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrap} style={{ background: product.bg }}>
        <img src={product.imageUrl} alt={product.name} className={styles.productShape} />
        <div className={`${styles.hoverOverlay} ${hovered ? styles.hoverVisible : ''}`}>
          <p className={styles.hoverName}>{product.name}</p>
          <p className={styles.hoverPrice}>{product.price.toLocaleString()} {product.currency}</p>
        </div>
      </div>
    </Link>
  );
}

function MensEditSection({ products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50 && activeIndex < products.length - 1) setActiveIndex((i) => i + 1);
    if (diff < -50 && activeIndex > 0) setActiveIndex((i) => i - 1);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>THE EDIT</h2>
        <Link to="/shop/men" className={styles.viewAll}>view all</Link>
      </div>

      {/* Desktop grid */}
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
          {products.map((product) => (
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
          {products.map((_, i) => (
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

export default MensEditSection;
