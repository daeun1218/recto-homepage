import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartPopup.module.css';

export default function WishlistPopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>위시리스트 담기</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* Product */}
        <div className={styles.body}>
          <div className={styles.product}>
            <div className={styles.imgWrap}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.info}>
              <p className={styles.productName}>{item.name}</p>
              <p className={styles.option}>[옵션: {item.size}]</p>
              <p className={styles.qty}>수량 : {item.quantity}</p>
              <p className={styles.price}>{item.price.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className={styles.footer}>
          <Link to="/cart" className={styles.goCartBtn} onClick={onClose}>
            위시리스트 이동
          </Link>
          <button className={styles.buyNowBtn} onClick={onClose}>
            쇼핑 계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
