import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { eyewearProducts } from '../data/mockData';
import heroBanner from '../assets/images/banner3.jpg';
import styles from './CollabPage.module.css';

export default function CollabPage() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <Link to="/" className={styles.backBtn} aria-label="Back to Home">←</Link>

      {/* Hero Banner */}
      <section className={styles.hero}>
        <img src={heroBanner} alt="EFFECTOR × RECTO" className={styles.heroImg} />
        <div className={styles.heroOverlay}>
          <p className={styles.heroSub}>Collaboration</p>
          <h1 className={styles.heroTitle}>EFFECTOR × RECTO</h1>
        </div>
      </section>

      {/* Product Grid */}
      <section className={styles.products}>
        <div className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>ALL ITEMS</h2>
          <span className={styles.productsCount}>
            {eyewearProducts.length} Products
          </span>
        </div>

        <div className={styles.grid}>
          {eyewearProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={styles.card}
            >
              <div className={styles.imgWrap}>
                <img
                  src={product.imageUrl}
                  alt={`${product.name} (${product.color})`}
                  className={styles.img}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <p className={styles.color}>{product.color}</p>
                <p className={styles.price}>
                  {product.price.toLocaleString()} {product.currency}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
