import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('delivery');
  const [checkedIds, setCheckedIds] = useState(() => cartItems.map((_, i) => i));

  const toggleCheck = (idx) => {
    setCheckedIds((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleAll = () => {
    if (checkedIds.length === cartItems.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(cartItems.map((_, i) => i));
    }
  };

  const deleteSelected = () => {
    const sorted = [...checkedIds].sort((a, b) => b - a);
    sorted.forEach((idx) => removeFromCart(idx));
    setCheckedIds([]);
  };

  const totalPrice = checkedIds.reduce((sum, idx) => {
    const item = cartItems[idx];
    return item ? sum + item.price : sum;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>CART</h1>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={activeTab === 'delivery' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('delivery')}
          >
            배송상품 ({cartItems.length})
          </button>
          <span className={styles.tabDivider}>|</span>
          <button
            className={activeTab === 'wishlist' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('wishlist')}
          >
            위시리스트 ({wishlistItems.length})
          </button>
        </div>

        {activeTab === 'wishlist' ? (
          wishlistItems.length === 0 ? (
            <div className={styles.empty}>
              <p>위시리스트가 비어있습니다.</p>
              <Link to="/" className={styles.emptyLink}>쇼핑 계속하기</Link>
            </div>
          ) : (
            <div className={styles.wishlistList}>
              {wishlistItems.map((item, idx) => (
                <div key={idx} className={styles.wishlistItem}>
                  <div className={styles.itemImg}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
                    <p className={styles.wishlistOption}>[옵션: {item.size}]</p>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeFromWishlist(idx)} aria-label="삭제">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <line x1="2" y1="2" x2="14" y2="14" stroke="#999" strokeWidth="1" />
                      <line x1="14" y1="2" x2="2" y2="14" stroke="#999" strokeWidth="1" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )
        ) : cartItems.length === 0 ? (
          <div className={styles.empty}>
            <p>장바구니가 비어있습니다.</p>
            <Link to="/" className={styles.emptyLink}>쇼핑 계속하기</Link>
          </div>
        ) : (
          <div className={styles.content}>
            {/* Left: Product List */}
            <div className={styles.left}>
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>일반상품 ({cartItems.length})</span>
                </div>

                {cartItems.map((item, idx) => (
                  <div key={idx} className={styles.cartItem}>
                    <div className={styles.itemTop}>
                      <label className={styles.checkbox}>
                        <input
                          type="checkbox"
                          checked={checkedIds.includes(idx)}
                          onChange={() => toggleCheck(idx)}
                        />
                        <span className={styles.checkmark} />
                      </label>
                      <div className={styles.itemImg}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
                        <p className={styles.itemDiscount}>-0원</p>
                        <p className={styles.itemShipping}>배송 : [무료] / 기본배송</p>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(idx)} aria-label="삭제">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <line x1="2" y1="2" x2="14" y2="14" stroke="#999" strokeWidth="1" />
                          <line x1="14" y1="2" x2="2" y2="14" stroke="#999" strokeWidth="1" />
                        </svg>
                      </button>
                    </div>

                    <div className={styles.optionRow}>
                      <span className={styles.optionArrow}>└</span>
                      <span>[옵션: {item.size}]</span>
                    </div>

                    <div className={styles.qtyRow}>
                      <span className={styles.qtyLabel}>수량</span>
                      <div className={styles.qtyControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button className={styles.qtyChangeBtn}>변경</button>
                      </div>
                    </div>

                    <div className={styles.orderRow}>
                      <span className={styles.orderLabel}>주문금액</span>
                      <span className={styles.orderPrice}>{item.price.toLocaleString()}원</span>
                    </div>

                    <div className={styles.itemActions}>
                      <button className={styles.itemActionBtn}>관심상품</button>
                      <button className={styles.itemActionBtn}>주문하기</button>
                    </div>
                  </div>
                ))}

                {/* Shipping summary */}
                <div className={styles.shippingSummary}>
                  <p className={styles.shippingLabel}>[기본배송]</p>
                  <p>상품구매금액 {totalPrice.toLocaleString()} + 배송비 0 (무료)</p>
                  <p className={styles.shippingTotal}>합계 : {totalPrice.toLocaleString()}원</p>
                </div>
              </div>

              {/* Bottom actions */}
              <div className={styles.bottomActions}>
                <div className={styles.bottomLeft}>
                  <button className={styles.outlineBtn} onClick={toggleAll}>전체선택</button>
                  <button className={styles.outlineBtn} onClick={deleteSelected}>선택삭제</button>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className={styles.right}>
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>총 상품금액</span>
                  <span className={styles.summaryValue}>{totalPrice.toLocaleString()}<small>원</small></span>
                </div>
                <div className={styles.summaryRow}>
                  <span>총 배송비</span>
                  <span className={styles.summaryValue}>0<small>원</small></span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={styles.summaryRow}>
                  <span>결제예정금액</span>
                  <span className={styles.summaryTotal}>{totalPrice.toLocaleString()}<small>원</small></span>
                </div>
              </div>

              <button className={styles.orderAllBtn}>전체상품주문</button>
              <button className={styles.orderSelectedBtn}>선택상품주문</button>

              <p className={styles.notice}>
                <span className={styles.noticeIcon}>!</span>
                할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
