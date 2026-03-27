import React from 'react';
import styles from './CollabBanner.module.css';

function CollabBanner() {
  return (
    <section className={styles.banner}>
      {/* Eyewear decoration left */}
      <div className={`${styles.eyewear} ${styles.eyewearLeft}`}>
        <div className={styles.frame}>
          <div className={`${styles.lens} ${styles.lensL}`} />
          <div className={styles.bridge} />
          <div className={`${styles.lens} ${styles.lensR}`} />
        </div>
      </div>

      {/* Eyewear decoration right */}
      <div className={`${styles.eyewear} ${styles.eyewearRight}`}>
        <div className={styles.frame}>
          <div className={`${styles.lens} ${styles.lensL}`} />
          <div className={styles.bridge} />
          <div className={`${styles.lens} ${styles.lensR}`} />
        </div>
      </div>

      {/* Center content */}
      <div className={styles.center}>
        <p className={styles.collab}>EFFECTOR × RECTO</p>
        <a href="#!" className={styles.viewBtn}>
          VIEW
        </a>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default CollabBanner;
