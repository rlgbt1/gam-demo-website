import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import gamLogo from '../../assets/photos/gam-logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <img src={gamLogo} alt="GAM — Grupo António Mosquito" />
          <p>
            Um grupo empresarial angolano consolidado em sete sectores económicos, em expansão para os
            petróleos — a gerir cerca de vinte empresas em Angola e além-fronteiras.
          </p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h4>Navegação</h4>
            <Link to="/">Home</Link>
            <Link to="/grupo">Grupo / Sobre Nós</Link>
          </div>
          <div className={styles.col}>
            <h4>Sectores</h4>
            <span>Comércio e Transporte</span>
            <span>Petróleos</span>
            <span>Construção Civil</span>
            <span>Agricultura e Pecuária</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {year} GAM — Grupo António Mosquito. Protótipo de demonstração, produzido por Teko.</span>
        <span className={styles.concept}>GAM Digital Ecosystem — Concept</span>
      </div>
    </footer>
  );
}
