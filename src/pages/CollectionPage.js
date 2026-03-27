// pages/CollectionPage.js
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from './CollectionPage.module.css';

const collections = {
  women: {
    title: 'Women SS26',
    items: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      src: `https://recto.co/img/ss26/collection/women/${i + 1}.jpg`,
    })),
  },
  men: {
    title: 'Men SS26',
    items: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      src: `https://recto.co/img/ss26/collection/men/${i + 1}.jpg`,
    })),
  },
};

export default function CollectionPage() {
  const { id } = useParams();
  const collection = collections[id];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!collection) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '200px 0', fontFamily: 'var(--font-en)' }}>
          <p>Collection not found.</p>
          <Link to="/" style={{ color: '#999', fontSize: 12 }}>Back to Home</Link>
        </div>
      </>
    );
  }

  const { title, items } = collection;
  const activeItem = items[activeIndex];

  return (
    <>
      <Header />
      <div className={styles.page}>
        <Link to="/" className={styles.backBtn} aria-label="Back to Home">←</Link>
        {/* 왼쪽 히어로 */}
        <div className={styles.heroPanel}>
          <div className={styles.heroImageWrap}>
            <img
              key={activeItem.id}
              src={activeItem.src}
              alt={title}
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroMeta}>
            <span className={styles.heroLabel}>{title}</span>
            <span className={styles.heroIndex}>
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* 오른쪽 썸네일 그리드 */}
        <div className={styles.gridPanel}>
          <p className={styles.gridTitle}>{title}</p>
          <div className={styles.grid}>
            {items.map((item, index) => (
              <button
                key={item.id}
                className={`${styles.thumb} ${index === activeIndex ? styles.thumbActive : ''}`}
                onClick={() => {
                  setActiveIndex(index);
                  if (window.innerWidth <= 768) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <img
                  src={item.src}
                  alt={`look ${item.id}`}
                  className={styles.thumbImage}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
