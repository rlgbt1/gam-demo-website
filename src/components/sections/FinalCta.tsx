import { Link } from 'react-router-dom';
import styles from './FinalCta.module.css';
import { ctaFinal } from '../../data/content';

type FinalCtaProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  linkTo?: string;
  linkLabel?: string;
};

export default function FinalCta({
  eyebrow = ctaFinal.eyebrow,
  title = ctaFinal.title,
  body = ctaFinal.body,
  linkTo = '/grupo',
  linkLabel = 'Conhecer o Grupo António Mosquito',
}: FinalCtaProps) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <p className="kicker on-dark">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <div className={styles.actions}>
          <Link to={linkTo} className="btn btn-gold">
            {linkLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
