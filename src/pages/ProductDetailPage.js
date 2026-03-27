import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CartPopup from '../components/CartPopup';
import { useCart } from '../context/CartContext';
import { allProducts, womenProducts, menProducts } from '../data/mockData';
import productImages from '../data/productImages';
import productDetails from '../data/productDetails';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find((p) => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [sizeWarning, setSizeWarning] = useState(false);
  const { addToCart } = useCart();

  // 상품 변경 시 상태 초기화 & 스크롤 맨 위로
  useEffect(() => {
    setActiveImg(0);
    setSelectedSize(null);
    setQuantity(0);
    setOpenAccordion(null);
    const wrapper = document.querySelector(`.${styles.wrapper}`);
    if (wrapper) wrapper.scrollTop = 0;
  }, [id]);

  if (!product) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div style={{ textAlign: 'center', padding: '200px 0', fontFamily: 'var(--font-en)' }}>
          <p>Product not found.</p>
          <Link to="/" style={{ color: '#999', fontSize: 12 }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  // productDetails 매핑에서 상세 정보 병합
  const details = productDetails[product.id];
  const merged = details
    ? { ...product, ...details, description: details.description || product.description, material: details.material || product.material, sizes: details.sizes || product.sizes, origin: details.origin || product.origin, care: details.care || product.care }
    : product;

  const images = productImages[product.id] || product.detailImages || [product.imageUrl];
  const sizeOptions = merged.sizes?.map((s) => s.size) || [];
  const totalPrice = selectedSize ? product.price * Math.max(quantity, 1) : 0;
  const totalQty = selectedSize ? Math.max(quantity, 1) : 0;

  const handleSizeClick = (size) => {
    setSizeWarning(false);
    if (selectedSize === size) {
      setSelectedSize(null);
      setQuantity(0);
    } else {
      setSelectedSize(size);
      setQuantity(1);
    }
  };

  const requireSize = () => {
    if (!selectedSize && sizeOptions.length > 0) {
      setSizeWarning(true);
      return true;
    }
    return false;
  };

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const sizeTableKeys = merged.sizes?.length
    ? Object.keys(merged.sizes[0]).filter((k) => k !== 'size')
    : [];

  const formatKey = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

  const materialLines = merged.material
    ? Object.entries(merged.material).map(
        ([key, val]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}`
      )
    : [];

  return (
    <div className={styles.wrapper}>
      <Header />
      <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">←</button>
      <div className={styles.page}>
        <div className={styles.productSection}>
          {/* ── 왼쪽: 썸네일 ── */}
          <div className={styles.thumbnails}>
            {images.map((src, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>

          {/* ── 중앙: 히어로 이미지 ── */}
          <div className={styles.hero}>
            <img
              key={activeImg}
              src={images[activeImg]}
              alt={product.name}
              className={styles.heroImg}
            />
          </div>

          {/* ── 오른쪽: 상품 정보 ── */}
          <div className={styles.infoArea}>
            <p className={styles.productCode}>{product.code}</p>
            <h1 className={styles.productName}>
              {product.name} ({product.color})
            </h1>

            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>PRICE</span>
              <span className={styles.priceValue}>
                {product.price.toLocaleString()} {product.currency}
              </span>
            </div>

            {sizeOptions.length > 0 && (
              <div className={styles.sizeRow}>
                <span className={styles.sizeLabel}>SIZE</span>
                <div className={styles.sizeButtons}>
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size === 'OS' ? 'F' : size}
                    </button>
                  ))}
                  {sizeWarning && <span className={styles.sizeWarning}>사이즈를 먼저 정해주세요.</span>}
                </div>
              </div>
            )}

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>TOTAL PRICE</span>
              <span className={styles.totalValue}>
                {totalPrice.toLocaleString()}
                <span className={styles.won}>원</span>{' '}
                <span className={styles.qty}>({totalQty}개)</span>
              </span>
            </div>

            <button className={styles.buyBtn} onClick={() => requireSize()}>BUY IT NOW</button>

            <div className={styles.subButtons}>
              <button
                className={styles.cartBtn}
                onClick={() => {
                  if (requireSize()) return;
                  const item = {
                    name: `${product.name} - ${product.color}`,
                    size: selectedSize === 'OS' ? 'F' : selectedSize,
                    quantity: Math.max(quantity, 1),
                    price: product.price * Math.max(quantity, 1),
                    image: images[0],
                  };
                  addToCart(item);
                  setCartItem(item);
                }}
              >CART</button>
              <button className={styles.wishBtn}>WISH LIST</button>
            </div>

            {/* ── 아코디언 ── */}
            <div className={styles.accordions}>
              <div className={styles.accordionItem}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('detail')}>
                  <span>DETAIL</span>
                  <span className={styles.accordionIcon}>{openAccordion === 'detail' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'detail' && (
                  <div className={styles.accordionBody}>
                    <p>{merged.description}</p>
                    {merged.origin && <p>{merged.origin}</p>}
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('size')}>
                  <span>SIZE (CM)</span>
                  <span className={styles.accordionIcon}>{openAccordion === 'size' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'size' && merged.sizes && (
                  <div className={styles.accordionBody}>
                    <table className={styles.sizeTable}>
                      <thead>
                        <tr>
                          <th>Size</th>
                          {sizeTableKeys.map((k) => <th key={k}>{formatKey(k)}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {merged.sizes.map((row) => (
                          <tr key={row.size}>
                            <td>{row.size}</td>
                            {sizeTableKeys.map((k) => <td key={k}>{row[k]}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('materials')}>
                  <span>MATERIALS</span>
                  <span className={styles.accordionIcon}>{openAccordion === 'materials' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'materials' && (
                  <div className={styles.accordionBody}>
                    {materialLines.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('care')}>
                  <span>HOW TO WASH</span>
                  <span className={styles.accordionIcon}>{openAccordion === 'care' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'care' && merged.care && (
                  <div className={styles.accordionBody}>
                    <ul className={styles.careList}>
                      {merged.care.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── You May Also Like ── */}
        <div className={styles.recommend}>
          <p className={styles.recommendTitle}>You May Also Like</p>
          <div className={styles.recommendGrid}>
            {(womenProducts.some((p) => p.id === product.id) ? womenProducts : menProducts)
              .filter((p) => p.id !== product.id && p.imageUrl && p.category === product.category)
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className={styles.recommendCard}>
                  <div className={styles.recommendImgWrap} style={{ backgroundColor: p.bg || '#eae8e3' }}>
                    <img src={p.detailImages?.[0] || p.imageUrl} alt={p.name} />
                  </div>
                  <p className={styles.recommendName}>{p.name} ({p.color})</p>
                  <p className={styles.recommendPrice}>{p.price.toLocaleString()} {p.currency}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <CartPopup item={cartItem} onClose={() => setCartItem(null)} />
    </div>
  );
}
