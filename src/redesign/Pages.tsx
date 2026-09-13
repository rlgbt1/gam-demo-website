import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { assets, companies, sectors, values } from "./content";
import { useLanguage } from "./useLanguage";
import { Arrow, ButtonLink, Callout, Label, PageIntro } from "./ui";
import { Stats } from "./Home";
import { Honeycomb, Journey } from "./GroupStory";
export function Group() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        label={t("O Grupo", "The Group")}
        title={t(
          "Diferentes empresas. A mesma visão.",
          "Different companies. The same vision.",
        )}
        description={t(
          "Uma organização que reúne negócios, pessoas e competências, em Angola e além-fronteiras.",
          "An organisation bringing together businesses, people and expertise, in Angola and beyond.",
        )}
      />
      <Honeycomb />
      <section className="group-image">
        <img src={assets.bus} alt="Huambo Expresso" />
        <span>
          {t(
            "Comércio e Transporte · Uma das áreas de actividade do Grupo",
            "Trade & Transport · One of the Group’s business areas",
          )}
        </span>
      </section>
      <section className="editorial section-pad grid-lines">
        <Label>{t("Quem somos", "Who we are")}</Label>
        <div>
          <h2>
            {t(
              "Organizar o presente. Preparar o futuro.",
              "Organising the present. Preparing for the future.",
            )}
          </h2>
          <p>
            {t(
              "O GAM nasceu da necessidade de organizar a gestão das empresas que o integram, segundo padrões internacionais. Gere cerca de vinte companhias com investimentos em Angola e fora de fronteiras.",
              "GAM was created to coordinate the management of its companies in line with international standards. It manages around twenty companies with investments in Angola and abroad.",
            )}
          </p>
          <p>
            {t(
              "A diversidade de sectores é parte da identidade do Grupo. Comércio e transporte, construção civil, hotelaria, imobiliária, banca, agricultura e pecuária e indústria formam a sua base de actividade. A exploração de petróleos alarga este portfólio.",
              "Diversity is part of the Group’s identity. Trade and transport, construction, hospitality, real estate, banking, agriculture and livestock, and industry form its business base. Oil exploration extends this portfolio.",
            )}
          </p>
        </div>
      </section>
      <section className="chairman section-pad">
        <FounderPortrait linked />
        <div>
          <Label>{t("Liderança", "Leadership")}</Label>
          <h2>
            {t("Uma visão que une o Grupo.", "A vision that unites the Group.")}
          </h2>
          <blockquote>
            “
            {t(
              "Servir o Cliente, Diversificar a Oferta de Produtos, e Garantir a melhor Qualidade.",
              "Serve the Customer, Diversify the Product Offering, and Ensure the Best Quality.",
            )}
            ”
          </blockquote>
          <span className="quote-caption">
            {t("Lema institucional do GAM", "GAM’s institutional motto")}
          </span>
          <div className="chairman-name">
            <strong>António Mosquito</strong>
            <p>
              {t(
                "Presidente do Conselho Administrativo",
                "Chairman of the Board",
              )}
            </p>
          </div>
        </div>
      </section>
      <Journey />
      <Stats />
      <section className="values section-pad grid-lines">
        <Label>{t("Os nossos valores", "Our values")}</Label>
        <h2>
          {t("Princípios que nos orientam.", "Principles that guide us.")}
        </h2>
        <div>
          {values.map(([pt, en], i) => (
            <article key={pt}>
              <span>0{i + 1}</span>
              <h3>{t(pt, en)}</h3>
            </article>
          ))}
        </div>
      </section>
      <Callout companyFocus />
    </>
  );
}
export function Companies() {
  const { t, index } = useLanguage();
  const [filter, setFilter] = useState("all");
  const filtered = companies.filter(
    (c) => filter === "all" || c.category === filter,
  );
  return (
    <>
      <PageIntro
        label={t("Empresas", "Companies")}
        title={t(
          "Especialidades distintas. Força colectiva.",
          "Distinct specialities. Collective strength.",
        )}
        description={t(
          "Explore as empresas apresentadas no portfólio institucional do Grupo António Mosquito.",
          "Explore the companies presented in Grupo António Mosquito’s institutional portfolio.",
        )}
      />
      <section className="company-directory section-pad grid-lines">
        <div
          className="filter-bar"
          aria-label={t("Filtrar empresas", "Filter companies")}
        >
          {[
            ["all", t("Todas", "All")],
            ["transport", t("Transporte", "Transport")],
            ["energy", t("Oil & Gas", "Oil & Gas")],
            ["construction", t("Construção", "Construction")],
            ["other", t("Outras actividades", "Other activities")],
          ].map(([id, label]) => (
            <button
              key={id}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
          <span aria-live="polite">
            {String(filtered.length).padStart(2, "0")}{" "}
            {t("empresas", "companies")}
          </span>
        </div>
        <div className="company-grid">
          {filtered.map((c) => (
            <Link key={c.id} to={`/empresas/${c.id}`} className="company-card">
              <div className="company-logo">
                <img src={c.logo} alt={c.name} loading="lazy" />
              </div>
              <div>
                <h2>{c.name}</h2>
                <Arrow />
              </div>
              <p>{c.sector[index]}</p>
            </Link>
          ))}
        </div>
      </section>
      <Callout />
    </>
  );
}
export function CompanyDetail() {
  const { id } = useParams();
  const { t, index } = useLanguage();
  const company = companies.find((c) => c.id === id);
  if (!company) return <NotFound />;
  return (
    <>
      <PageIntro
        label={t("Empresas", "Companies")}
        title={company.name}
        description={company.sector[index]}
      />
      <section className="company-profile section-pad">
        <div className="profile-logo">
          <img src={company.logo} alt={company.name} />
        </div>
        <div>
          <Label>{t("Portfólio GAM", "GAM portfolio")}</Label>
          <h2>
            {company.headline?.[index] ||
              t(
                "Parte de um Grupo diversificado.",
                "Part of a diversified Group.",
              )}
          </h2>
          <p>
            {company.description?.[index] ||
              t(
                `${company.name} integra o portfólio de empresas apresentado pelo Grupo António Mosquito.`,
                `${company.name} is part of the company portfolio presented by Grupo António Mosquito.`,
              )}
          </p>
          <div className="coming-inline">
            <span className="status-dot" />
            {t("Perfil completo em breve", "Full profile coming soon")}
          </div>
          <p className="muted">
            {t(
              "A actividade, os projectos e os contactos próprios da empresa serão apresentados na próxima fase.",
              "Company activities, projects and dedicated contact details will be presented in the next phase.",
            )}
          </p>
          <ButtonLink to="/empresas" dark>
            {t("Todas as empresas", "All companies")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
export function Sectors() {
  const { t, index } = useLanguage();
  return (
    <>
      <PageIntro
        label={t("Sectores de actividade", "Business sectors")}
        title={t(
          "Múltiplos sectores. Um horizonte comum.",
          "Multiple sectors. A shared horizon.",
        )}
        description={t(
          "Sete sectores consolidados e presença na exploração de petróleos. Conheça a diversidade de actividade do Grupo.",
          "Seven established sectors and a presence in oil exploration. Discover the Group’s breadth of activity.",
        )}
      />
      <section className="sector-list section-pad grid-lines">
        {sectors.map((s, i) => (
          <details key={s[0]} open={i === 0 ? true : undefined}>
            <summary>
              <span>0{i + 1}</span>
              <h2>{s[index]}</h2>
              <span className="sector-expand">+</span>
            </summary>
            <div className="sector-description">
              <p>
                {i === 7
                  ? t(
                      "A exploração de petróleos integra os investimentos descritos pelo GAM na sua apresentação institucional.",
                      "Oil exploration is among the investments described in GAM’s institutional profile.",
                    )
                  : t(
                      "Uma das áreas de actividade consolidadas do Grupo António Mosquito.",
                      "One of Grupo António Mosquito’s established areas of activity.",
                    )}
              </p>
              <span className="coming-inline">
                {t(
                  "Projectos e informação detalhada em breve.",
                  "Projects and detailed information coming soon.",
                )}
              </span>
              <Link to="/empresas" className="text-link">
                {t("Explorar as empresas", "Explore the companies")}
                <Arrow />
              </Link>
            </div>
          </details>
        ))}
      </section>
      <Callout />
    </>
  );
}
export function Sustainability() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        label={t("Sustentabilidade", "Sustainability")}
        title={t("Crescer com responsabilidade.", "Growing responsibly.")}
        description={t(
          "Segurança, qualidade e responsabilidade social fazem parte da visão institucional do GAM.",
          "Safety, quality and social responsibility are part of GAM’s institutional vision.",
        )}
      />
      <section className="sustainability-banner">
        <img
          src={assets.team}
          alt={t("Equipa Huambo Expresso", "Huambo Expresso team")}
        />
      </section>
      <section className="responsibility-grid section-pad grid-lines">
        {[
          [
            t("Investimento responsável", "Responsible investment"),
            t(
              "O Grupo apresenta o investimento seguro e responsável como parte da sua visão.",
              "The Group identifies safe and responsible investment as part of its vision.",
            ),
          ],
          [
            t("Ambiente", "Environment"),
            t(
              "A eficiência e a sustentabilidade ambiental integram os compromissos institucionais do GAM.",
              "Efficiency and environmental sustainability are part of GAM’s institutional commitments.",
            ),
          ],
          [
            t("Pessoas", "People"),
            t(
              "A formação profissional merece particular atenção no desenvolvimento das organizações do Grupo.",
              "Professional training receives particular attention in the development of the Group’s organisations.",
            ),
          ],
        ].map(([title, body], i) => (
          <article key={title}>
            <span>0{i + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="coming-band section-pad">
        <Label>{t("Próximo capítulo", "Next chapter")}</Label>
        <h2>
          {t(
            "Mais sobre o nosso impacto, em breve.",
            "More about our impact, coming soon.",
          )}
        </h2>
        <p>
          {t(
            "Iniciativas, projectos e indicadores serão partilhados nesta área.",
            "Initiatives, projects and indicators will be shared here.",
          )}
        </p>
      </section>
    </>
  );
}
export function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageIntro
        label={t("Contactos", "Contact")}
        title={t("O diálogo abre caminhos.", "Dialogue opens possibilities.")}
        description={t(
          "Entre em contacto com o Grupo António Mosquito.",
          "Get in touch with Grupo António Mosquito.",
        )}
      />
      <section className="contact-layout section-pad grid-lines">
        <div>
          <Label>{t("Fale connosco", "Get in touch")}</Label>
          <a className="contact-email" href="mailto:geral@gam.ao">
            geral@gam.ao
            <Arrow />
          </a>
          <div className="contact-info">
            <h2>{t("Sede", "Head office")}</h2>
            <p>
              Rua Karipande (ex. 28 de Maio), 51–53
              <br />
              Maianga, Luanda · Angola
            </p>
            <a href="tel:+244222370194">+244 222 370 194</a>
            <a href="tel:+244222339177">+244 222 339 177</a>
          </div>
          <span className="contact-note">
            {t(
              "Contactos publicados no website institucional do GAM.",
              "Contact details published on GAM’s institutional website.",
            )}
          </span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = `GAM — ${data.get("subject")}`;
            const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
            window.location.href = `mailto:geral@gam.ao?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
        >
          <h2>{t("Deixe-nos uma mensagem.", "Leave us a message.")}</h2>
          <p className="form-note">
            {t(
              "Este formulário abre a sua aplicação de email com a mensagem preparada.",
              "This form opens your email application with your message prepared.",
            )}
          </p>
          <label>
            {t("Nome", "Name")}
            <input name="name" required autoComplete="name" maxLength={100} />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
            />
          </label>
          <label>
            {t("Assunto", "Subject")}
            <select name="subject">
              <option>{t("Informações gerais", "General enquiry")}</option>
              <option>{t("Parcerias", "Partnerships")}</option>
              <option>{t("Imprensa", "Press")}</option>
            </select>
          </label>
          <label>
            {t("Mensagem", "Message")}
            <textarea name="message" rows={4} required maxLength={3000} />
          </label>
          <button type="submit" className="button-link dark">
            {t("Preparar email", "Prepare email")}
            <Arrow />
          </button>
          {sent && (
            <p role="status" className="form-status">
              {t(
                "Mensagem preparada. Conclua o envio na sua aplicação de email. Se não abriu, contacte geral@gam.ao.",
                "Message prepared. Complete sending in your email application. If it did not open, contact geral@gam.ao.",
              )}
            </p>
          )}
        </form>
      </section>
    </>
  );
}
export function ComingSoon({ type }: { type: "news" | "careers" }) {
  const { t } = useLanguage();
  const news = type === "news";
  return (
    <>
      <PageIntro
        label={news ? t("Actualidade", "News") : t("Carreiras", "Careers")}
        title={
          news
            ? t("O Grupo em perspectiva.", "The Group in perspective.")
            : t(
                "O próximo passo pode ser aqui.",
                "Your next step could be here.",
              )
        }
        description={
          news
            ? t(
                "Um espaço para acompanhar as empresas, as pessoas e os novos capítulos do GAM.",
                "A space to follow GAM’s companies, people and new chapters.",
              )
            : t(
                "Conheça, em breve, as oportunidades e as pessoas que fazem parte do Grupo.",
                "Discover the opportunities and people that are part of the Group, coming soon.",
              )
        }
      />
      <section className="coming-page section-pad">
        <div className="coming-art" aria-hidden="true">
          <div />
          <span>{news ? "GAM" : "→"}</span>
        </div>
        <div>
          <span className="coming-inline">
            <span className="status-dot" />
            {t("Em breve", "Coming soon")}
          </span>
          <h2>
            {news
              ? t("Há mais para partilhar.", "There is more to share.")
              : t(
                  "Talento com lugar para crescer.",
                  "Room for talent to grow.",
                )}
          </h2>
          <p>
            {news
              ? t(
                  "Notícias, comunicados e histórias do Grupo estarão disponíveis na próxima fase deste espaço.",
                  "News, announcements and stories from the Group will be available in the next phase.",
                )
              : t(
                  "As oportunidades de carreira serão publicadas nesta área. Para informações gerais, utilize os contactos do Grupo.",
                  "Career opportunities will be published here. For general enquiries, use the Group’s contact details.",
                )}
          </p>
          <ButtonLink to="/contactos" dark>
            {t("Contactar o Grupo", "Contact the Group")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
export function NotFound() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        label="404"
        title={t(
          "Este caminho ainda não existe.",
          "This path does not exist yet.",
        )}
        description={t(
          "Continue a explorar o universo GAM.",
          "Keep exploring GAM.",
        )}
      />
      <div className="section-pad">
        <ButtonLink to="/" dark>
          {t("Voltar ao início", "Back to home")}
        </ButtonLink>
      </div>
    </>
  );
}

function FounderPortrait({ linked = false }: { linked?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="founder-visual">
      <div className="founder-art">
        <div className="founder-crop">
          <img src={assets.chairman} alt="António Mosquito" loading="lazy" />
        </div>
        <svg
          className="founder-symbol"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="m50 6 20 12v24L50 54 30 42V18Zm-22 39 20 12v24L28 93 8 81V57Zm44 0 20 12v24L72 93 52 81V57Z" />
        </svg>
      </div>
      {linked && (
        <Link to="/fundador" className="founder-link text-link">
          {t("Saiba mais sobre o fundador", "Learn more about the founder")}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
export function Founder() {
  const { t } = useLanguage();
  return (
    <>
      <PageIntro
        label={t("O fundador", "The founder")}
        title="António Mosquito"
        description={t(
          "Presidente do Conselho Administrativo do Grupo António Mosquito.",
          "Chairman of the Board of Grupo António Mosquito.",
        )}
      />
      <section className="founder-page section-pad grid-lines">
        <FounderPortrait />
        <div>
          <span className="coming-inline">
            <span className="status-dot" />
            {t("Em breve", "Coming soon")}
          </span>
          <h2>{t("Uma história para conhecer.", "A story to discover.")}</h2>
          <p>
            {t(
              "O percurso do fundador será apresentado neste espaço, numa próxima fase.",
              "The founder’s story will be presented here in the next phase.",
            )}
          </p>
          <ButtonLink to="/grupo" dark>
            {t("Voltar ao Grupo", "Back to the Group")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
