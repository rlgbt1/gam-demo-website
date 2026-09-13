import { Link } from 'react-router-dom';
import styles from './SimpleHero.module.css';
import { heroHeadline, sectors } from '../../data/content';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import skylineVideo from '../../assets/video/luanda-skyline.mp4';
import skylinePoster from '../../assets/video/luanda-skyline-poster.jpg';

const marqueeText = `${sectors.join(' · ')} · Petróleos · `;

/**
 * Versão leve do hero para mobile e para quem prefere movimento reduzido:
 * sem scroll-jacking (custa caro em Safari iOS e em ecrãs pequenos),
 * conteúdo final já visível, mesma identidade e mesmas cenas em vídeo.
 */
export default function SimpleHero() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <section className={styles.hero} aria-label="Apresentação do GAM">
      <div className={styles.bg}>
        {reduced ? (
          <img src={skylinePoster} alt="Perspectiva de Luanda" />
        ) : (
          <video src={skylineVideo} poster={skylinePoster} muted loop playsInline autoPlay preload="auto" />
        )}
      </div>

      <div className={styles.marqueeStrip}>
        <div className={styles.marqueeTrack}>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className="kicker on-dark">{heroHeadline.kicker}</p>
        <h1>{heroHeadline.title}</h1>
        <p className={styles.sub}>{heroHeadline.subtitle}</p>
        <div className={styles.actions}>
          <Link to="/grupo" className="btn btn-gold">
            Descubra o GAM
          </Link>
          <a href="#escala" className="btn btn-outline" style={{ color: 'var(--paper)' }}>
            Ver números
          </a>
        </div>
      </div>
    </section>
  );
}
