import styles from './Group.module.css';
import { aboutParagraphs, brand, sectors, emergingSector, introStat } from '../data/content';
import FinalCta from '../components/sections/FinalCta';

import bannerImage from '../assets/video/luanda-skyline-poster.jpg';
import chairman from '../assets/photos/chairman.png';
import angolaMap from '../assets/photos/angola-map-gam.png';
import gamLogo from '../assets/photos/gam-logo.png';
import teamPhoto from '../assets/photos/team-huambo.jpg';

export default function Group() {
  return (
    <main>
      <section className={styles.banner}>
        <img src={bannerImage} alt="" />
        <div className={`container ${styles.bannerInner}`}>
          <p className="kicker on-dark">Grupo / Sobre Nós</p>
          <h1>{brand.fullName}</h1>
        </div>
      </section>

      <section className={styles.about}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.chairmanCol}>
            <div className={styles.portraitFrame}>
              <img src={chairman} alt={brand.chairman} />
            </div>
            <div>
              <p className={styles.chairmanName}>{brand.chairman}</p>
              <p className={styles.chairmanTitle}>{brand.chairmanTitle}</p>
            </div>
            <img src={gamLogo} alt="GAM" className={styles.gamMark} />
          </div>

          <div className={styles.textCol}>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}

            <div className={styles.statLine}>
              <div>
                <strong>{introStat.turnover}</strong>
                <span>Volume de negócios anual</span>
              </div>
              <div>
                <strong>{introStat.employees}</strong>
                <span>Colaboradores em Angola</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectorsSection}>
        <div className={`container ${styles.sectorsGrid}`}>
          <div>
            <p className="kicker">Sectores de Actividade</p>
            <h2>Solidamente consolidado em sete sectores.</h2>
            <div className={styles.sectorsList}>
              {sectors.map((sector, i) => (
                <div className={styles.sectorRow} key={sector}>
                  <span>{sector}</span>
                  <span className={styles.sectorIndex}>0{i + 1}</span>
                </div>
              ))}
              <div className={`${styles.sectorRow} ${styles.emerging}`}>
                <span>{emergingSector} — em expansão</span>
                <span className={styles.sectorIndex}>08</span>
              </div>
            </div>
          </div>

          <div className={styles.mapWrap}>
            <img src={angolaMap} alt="Angola — GAM Grupo António Mosquito" loading="lazy" />
          </div>
        </div>
      </section>

      <section className={styles.teamBand}>
        <div className="container">
          <img src={teamPhoto} alt="Equipa GAM junto de um autocarro Huambo Expresso" loading="lazy" />
          <p className={styles.teamCaption}>Equipa GAM — sector Comércio e Transporte, Huambo Expresso.</p>
        </div>
      </section>

      <FinalCta
        eyebrow="Ecossistema Digital"
        title="Veja a apresentação completa"
        body="Volte à Home para percorrer a escala do GAM através dos seus sectores, números e portfólio de empresas."
        linkTo="/"
        linkLabel="Voltar à Home"
      />
    </main>
  );
}
