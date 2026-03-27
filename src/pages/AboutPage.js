import Header from '../components/Header';
import aboutImg from '../assets/images/about.jpg';
import logo from '../assets/images/logo.png';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <Header />

      {/* Hero */}
      <section className={styles.hero}>
        <img src={aboutImg} alt="About RECTO" className={styles.heroImg} />
        <div className={styles.heroOverlay}>
          <img src={logo} alt="RECTO" className={styles.heroLogo} />
        </div>
      </section>

      {/* Korean */}
      <section className={styles.text}>
        <p>
          렉토의 미학은 직관적인 아름다움에 대한 정교한 탐구에서 출발합니다.
          <br />
          '책의 첫 장', 혹은 '곧은, 직선의'를 의미하는 브랜드명 어원처럼,
          <br />
          단순하고 간결한 조형을 유연하게 정제하여 그려낸 젠더 뉴트럴 실루엣은
          <br />
          렉토의 디자인 철학을 시각적으로 드러냅니다.
        </p>
        <p>
          렉토가 추구하는 고품질 의류 제품은 끊임없는 탐구로 정립하는 미학,
          <br />
          정교한 디테일로 갖추는 완성도, 시간의 흐름에도 한결같이 빛나는 디자인 가치를
          <br />
          가장 아름다운 형태로 정제한 결과물입니다.
        </p>
        <p>
          직선의 솔직함, 곡선의 유연함 사이에서 자유롭게 변주하는
          <br />
          렉토의 컬렉션은 매번 독자적인 시각으로 해석한 '뉴 클래식'을 제시하며,
          <br />
          확고한 취향과 엄격한 기준으로 선택하는 동시대 여성과 남성을 위해 패션의 새로운 페이지를 펼쳐 보입니다.
        </p>
      </section>

      {/* English */}
      <section className={`${styles.text} ${styles.textEn}`}>
        <p>
          Recto has pursued distinctive aesthetics, beginning with a meticulous exploration of intuitive beauty.
          <br />
          The brand's design philosophy is visually articulated in gender-neutral silhouettes,
          <br />
          which embody a flexible refinement distilled from simple and concise forms.
          <br />
          The brand's ethos is implied in its name meaning "the right-hand page of a book" and "straight."
        </p>
        <p>
          Recto's superior clothing is a skillful and refined fusion of unending studies of aesthetics,
          <br />
          perfection achieved through intricate detailing, and enduring design values.
        </p>
        <p>
          Each collection by Recto crafts a distinctive interplay of straightforward lines and flexible curves,
          <br />
          collectively proposing a "new classic" seen through the lens of the brand's original perspective.
          <br />
          This perspective opens up a new page for a diverse array of modern individuals — both men and women —
          <br />
          who curate their fashion choices based on discerning preferences and unwavering standards.
        </p>
      </section>
    </div>
  );
}
