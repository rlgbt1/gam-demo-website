import styles from './IntroSection.module.css';
import { aboutParagraphs, lema } from '../../data/content';

export default function IntroSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.heading}>
          <p className="kicker">O Grupo</p>
          <h2>Uma administração dinâmica ao serviço de Angola.</h2>
        </div>

        <div className={styles.body}>
          <p>{aboutParagraphs[0]}</p>
          <p>{aboutParagraphs[2]}</p>
          <blockquote className={styles.quote}>&ldquo;{lema}&rdquo;</blockquote>
        </div>
      </div>
    </section>
  );
}
