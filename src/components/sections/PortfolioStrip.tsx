import styles from './PortfolioStrip.module.css';
import { portfolioCompanies } from '../../data/content';

const logoModules = import.meta.glob<string>('../../assets/logos/*', {
  eager: true,
  import: 'default',
});

function logoSrc(key: string) {
  const entry = Object.entries(logoModules).find(([path]) => path.includes(`/${key}.`));
  return entry?.[1] ?? '';
}

export default function PortfolioStrip() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.head}`}>
        <div>
          <p className="kicker">Portfólio</p>
          <h2>Empresas geridas pelo Grupo.</h2>
        </div>
        <p className={styles.note}>
          Uma selecção do portfólio do GAM — perfis individuais disponíveis numa fase seguinte do projecto.
        </p>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {portfolioCompanies.map((company) => (
            <div className={styles.card} key={company.id}>
              <img src={logoSrc(company.logo)} alt={company.name} loading="lazy" />
              {company.tag && <span>{company.tag}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
