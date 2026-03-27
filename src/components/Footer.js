import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const links = ['Shop', 'Collections', 'About', 'Inquiry'];

  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>RECTO</p>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link}>
            <a href="#!" className={styles.link}>{link}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
