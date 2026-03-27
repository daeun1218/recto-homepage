import { useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import {
  womenProducts,
  signatureLeatherProducts,
  essentialProducts,
  menProducts,
} from '../data/mockData';
import styles from './ShopPage.module.css';

const categoryMap = {
  women: {
    all: womenProducts,
    outerwear: womenProducts.filter((p) => p.category === 'outerwear'),
    jackets: womenProducts.filter((p) => p.category === 'jackets'),
    tops: womenProducts.filter((p) => p.category === 'tops'),
    shirts: womenProducts.filter((p) => p.category === 'shirts'),
    knitwear: womenProducts.filter((p) => p.category === 'knitwear'),
    dresses: womenProducts.filter((p) => p.category === 'dresses'),
    skirts: womenProducts.filter((p) => p.category === 'skirts'),
    pants: womenProducts.filter((p) => p.category === 'pants'),
    'signature-leather': signatureLeatherProducts,
    essential: essentialProducts,
  },
  men: {
    all: menProducts,
    outerwear: menProducts.filter((p) => p.category === 'outerwear'),
    jackets: menProducts.filter((p) => p.category === 'jackets'),
    tops: menProducts.filter((p) => p.category === 'tops'),
    shirts: menProducts.filter((p) => p.category === 'shirts'),
    knitwear: menProducts.filter((p) => p.category === 'knitwear'),
    pants: menProducts.filter((p) => p.category === 'pants'),
    'signature-leather': signatureLeatherProducts,
    essential: essentialProducts,
  },
};

const categoryLabels = {
  outerwear: 'OUTERWEAR',
  jackets: 'JACKETS',
  tops: 'TOPS & T-SHIRTS',
  shirts: 'SHIRTS & BLOUSES',
  knitwear: 'KNITWEAR',
  dresses: 'DRESSES',
  skirts: 'SKIRTS',
  pants: 'PANTS',
  'signature-leather': 'SIGNATURE LEATHER',
  essential: 'ESSENTIAL',
  bags: 'BAG',
  shoes: 'SHOES',
  accessories: 'ACCESSORIES',
};

const sideCategories = {
  women: [
    { key: null, label: 'ALL' },
    { key: 'outerwear', label: 'OUTERWEAR' },
    { key: 'jackets', label: 'JACKETS' },
    { key: 'tops', label: 'TOPS & T-SHIRTS' },
    { key: 'shirts', label: 'SHIRTS & BLOUSES' },
    { key: 'knitwear', label: 'KNITWEAR' },
    { key: 'dresses', label: 'DRESSES' },
    { key: 'skirts', label: 'SKIRTS' },
    { key: 'pants', label: 'PANTS' },
    { key: 'signature-leather', label: 'SIGNATURE LEATHER' },
    { key: 'essential', label: 'ESSENTIAL' },
  ],
  men: [
    { key: null, label: 'ALL' },
    { key: 'outerwear', label: 'OUTERWEAR' },
    { key: 'jackets', label: 'JACKETS' },
    { key: 'tops', label: 'TOPS & T-SHIRTS' },
    { key: 'shirts', label: 'SHIRTS' },
    { key: 'knitwear', label: 'KNITWEAR' },
    { key: 'pants', label: 'PANTS' },
    { key: 'signature-leather', label: 'SIGNATURE LEATHER' },
    { key: 'essential', label: 'ESSENTIAL' },
  ],
};

export default function ShopPage() {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
  }, [category, gender]);

  const genderMap = categoryMap[gender];
  const products = genderMap
    ? (category && genderMap[category]) || genderMap.all || []
    : [];

  const pageTitle = gender === 'women' ? 'WOMEN' : 'MEN';
  const categoryTitle = category ? categoryLabels[category] || category.toUpperCase() : 'ALL';
  const sidebar = sideCategories[gender] || [];

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Header />
      <div className={styles.page}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>{pageTitle}</h2>
          <ul className={styles.sidebarList}>
            {sidebar.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.key ? `/shop/${gender}?category=${item.key}` : `/shop/${gender}`}
                  className={`${styles.sidebarLink} ${
                    (item.key === category || (!item.key && !category)) ? styles.sidebarLinkActive : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <main className={styles.main}>
          <div className={styles.topBar}>
            <h1 className={styles.categoryTitle}>{categoryTitle}</h1>
            <span className={styles.count}>{products.length} Products</span>
          </div>

          <div className={styles.grid}>
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={styles.card}
              >
                <div className={styles.imgWrap}>
                  <img
                    src={product.detailImages?.[0] || product.imageUrl}
                    alt={`${product.name} (${product.color})`}
                    className={styles.img}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>
                    {product.name} ({product.color})
                  </p>
                  <p className={styles.price}>
                    {product.price > 0
                      ? `${product.price.toLocaleString()} KRW`
                      : 'COMING SOON'}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className={styles.empty}>
              <p>No products found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
