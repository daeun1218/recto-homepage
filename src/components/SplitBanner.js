import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SplitBanner.module.css';

function SplitBanner({
  year = '2026',
  title,
  theme = 'light',
  img,
  mobileImg,
  bg = '#c8c5bc',
  viewLink = '#!',
  viewStyle = 'box',
  externalLink = false,
}) {
  const isDark = theme === 'dark';

  const btnClass = viewStyle === 'box'
    ? `${styles.viewBtn} ${styles.viewBtnBox} ${isDark ? styles.viewBtnDark : ''}`
    : `${styles.viewBtn} ${styles.viewBtnLine} ${isDark ? styles.viewBtnDark : ''}`;

  const btnContent = viewStyle === 'box'
    ? 'VIEW'
    : <>VIEW <span className={styles.btnUnderline} /></>;

  return (
    <section
      className={`${styles.banner} ${isDark ? styles.dark : styles.light}`}
      style={{ background: bg }}
    >
      {/* Background image — mobile / desktop */}
      {img && (
        <picture>
          {mobileImg && <source media="(max-width: 768px)" srcSet={mobileImg} />}
          <img src={img} alt="" className={styles.bgImg} />
        </picture>
      )}

      {/* Center overlay */}
      <div className={styles.overlay}>
        <p className={styles.year}>{year}</p>
        <p className={styles.title}>{title}</p>

        {externalLink ? (
          <a href={viewLink} className={btnClass}>{btnContent}</a>
        ) : (
          <Link to={viewLink} className={btnClass}>{btnContent}</Link>
        )}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={`${styles.scrollText} ${isDark ? styles.scrollDark : ''}`}>SCROLL</span>
        <div className={`${styles.scrollLine} ${isDark ? styles.scrollLineDark : ''}`} />
      </div>
    </section>
  );
}

export default SplitBanner;
