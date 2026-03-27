import { useState } from 'react';
import Header from '../components/Header';
import styles from './MyPage.module.css';

const tabs = ['주문조회', '회원정보', 'POINT', '쿠폰'];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('주문조회');

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.title}>MY PAGE</h1>

        {/* Membership */}
        <p className={styles.membership}>
          MEMBERSHIP : <strong>WHITE</strong>
          <span className={styles.badge}>배송비 무료</span>
        </p>

        <hr className={styles.divider} />

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>주문 내역</span>
            <span className={styles.statValue}>0건</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>보유 포인트</span>
            <span className={styles.statValue}>0P</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>쿠폰</span>
            <span className={styles.statValue}>0장</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <hr className={styles.divider} />

        {/* Tab Content */}
        <div className={styles.content}>
          {activeTab === '주문조회' && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>주문 내역이 없습니다.</p>
              <p className={styles.emptyDesc}>최근 6개월 이내의 주문 내역을 확인할 수 있어요</p>
            </div>
          )}
          {activeTab === '회원정보' && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>회원정보 페이지입니다.</p>
            </div>
          )}
          {activeTab === 'POINT' && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>적립된 포인트가 없습니다.</p>
            </div>
          )}
          {activeTab === '쿠폰' && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>보유 쿠폰이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
