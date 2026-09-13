import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "./content";
import { useLanguage } from "./useLanguage";
export function Arrow({
  direction = "right",
}: {
  direction?: "right" | "left" | "down";
}) {
  return (
    <svg
      className={`arrow ${direction}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="label">
      <i aria-hidden="true" />
      {children}
    </span>
  );
}
export function ButtonLink({
  to,
  children,
  dark = false,
}: {
  to: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <Link className={`button-link ${dark ? "dark" : ""}`} to={to}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="GAM — Grupo António Mosquito">
      <img src={assets.logo} alt="GAM" />
      <span>
        Grupo António
        <br />
        Mosquito
      </span>
    </Link>
  );
}
export function Header() {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 45);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          menuButton.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a, button") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        if (e.shiftKey && document.activeElement === els[0]) {
          e.preventDefault();
          els.at(-1)?.focus();
        } else if (!e.shiftKey && document.activeElement === els.at(-1)) {
          e.preventDefault();
          els[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const links = [
    ["/", "Home"],
    ["/grupo", t("O Grupo", "The Group")],
    ["/empresas", t("Empresas", "Companies")],
    ["/sectores", t("Sectores", "Sectors")],
    ["/actualidade", t("Actualidade", "News")],
  ];
  return (
    <header
      className={`site-header ${location.pathname === "/" && !scrolled && !open ? "over-hero" : ""} ${open ? "menu-open" : ""}`}
    >
      <Brand />
      <nav
        className="desktop-nav"
        aria-label={t("Navegação principal", "Main navigation")}
      >
        {links.map(([url, label]) => (
          <NavLink key={url} to={url}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="contact-nav" to="/contactos">
          {t("Contactos", "Contact")}
          <Arrow />
        </Link>
        <div className="language" aria-label={t("Idioma", "Language")}>
          <button aria-pressed={lang === "pt"} onClick={() => setLang("pt")}>
            PT
          </button>
          <span>/</span>
          <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation-panel"
          aria-label={t(
            open ? "Fechar menu" : "Abrir menu",
            open ? "Close menu" : "Open menu",
          )}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      {open && (
        <div ref={panel} id="navigation-panel" className="menu-panel">
          <Label>{t("Explore o GAM", "Explore GAM")}</Label>
          <nav onClick={() => setOpen(false)}>
            {[
              ...links,
              ["/sustentabilidade", t("Sustentabilidade", "Sustainability")],
              ["/contactos", t("Contactos", "Contact")],
            ].map(([url, label], i) => (
              <Link to={url} key={url}>
                <small>0{i + 1}</small>
                {label}
                <Arrow />
              </Link>
            ))}
          </nav>
          <span>Luanda, Angola · Grupo António Mosquito</span>
        </div>
      )}
    </header>
  );
}
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer grid-lines">
      <div className="footer-top">
        <Label>
          {t(
            "Pretende investir no mercado angolano?",
            "Looking to invest in the Angolan market?",
          )}
        </Label>
        <Link to="/contactos" className="footer-cta">
          {t("Vamos conversar.", "Let’s talk.")}
          <Arrow />
        </Link>
      </div>
      <div className="footer-grid">
        <Brand />
        <div>
          <span className="footer-label">{t("Explore", "Explore")}</span>
          <Link to="/">Home</Link>
          <Link to="/grupo">{t("O Grupo", "The Group")}</Link>
          <Link to="/empresas">{t("Empresas", "Companies")}</Link>
          <Link to="/sectores">
            {t("Sectores de actividade", "Business sectors")}
          </Link>
        </div>
        <div>
          <span className="footer-label">
            {t("Mais sobre o GAM", "More about GAM")}
          </span>
          <Link to="/sustentabilidade">
            {t("Sustentabilidade", "Sustainability")}
          </Link>
          <Link to="/actualidade">{t("Actualidade", "News")}</Link>
          <Link to="/carreiras">{t("Carreiras", "Careers")}</Link>
        </div>
        <div>
          <span className="footer-label">Luanda, Angola</span>
          <a href="mailto:geral@gam.ao">geral@gam.ao</a>
          <a href="tel:+244222370194">+244 222 370 194</a>
          <p>
            Rua Karipande, 51–53
            <br />
            Maianga, Luanda
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GAM · Grupo António Mosquito</span>
        <span>
          {t(
            "Conceito digital · Demonstração por",
            "Digital concept · Demo by",
          )}{" "}
          <a
            className="teko-footer-link"
            href={tekoWebsite}
            target="_blank"
            rel="noreferrer"
            aria-label={t("Conheça a Teko", "Discover Teko")}
          >
            <b>teko</b>
            <Arrow />
          </a>
          <a
            className="teko-footer-email"
            href="mailto:tekoo.aip@gmail.com"
            aria-label={t("Enviar email à Teko", "Email Teko")}
          >
            <MailIcon />
          </a>
        </span>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          {t("Voltar ao topo", "Back to top")} ↑
        </button>
      </div>
    </footer>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  const { t } = useLanguage();
  return (
    <section className="page-intro grid-lines">
      <div className="breadcrumbs">
        <Link to="/">{t("Início", "Home")}</Link>
        <span>/</span>
        <span>{label}</span>
      </div>
      <Label>{label}</Label>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
export function Callout({ companyFocus = false }: { companyFocus?: boolean }) {
  const { t } = useLanguage();
  return (
    <section className="callout">
      <Label>
        {t(
          "Um grupo. Múltiplas possibilidades.",
          "One group. Many possibilities.",
        )}
      </Label>
      <div>
        <h2>
          {companyFocus
            ? t(
                "Explore a diversidade do Grupo.",
                "Explore the Group’s diversity.",
              )
            : t(
                "Conheça quem está por trás do nome.",
                "Meet the people behind the name.",
              )}
        </h2>
        <ButtonLink to={companyFocus ? "/empresas" : "/grupo"} dark>
          {companyFocus
            ? t("As nossas empresas", "Our companies")
            : t("Descubra o GAM", "Discover GAM")}
        </ButtonLink>
      </div>
    </section>
  );
}

const tekoWebsite = "https://rlgbt1.github.io/teko-website-/";
const tekoWhatsapp =
  "https://wa.me/244922096472?text=Ol%C3%A1%20Teko%2C%20gostaria%20de%20conversar%20sobre%20um%20projecto.";
function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}
export function WhatsappIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7c1.8 1 3.7 1.5 5.7 1.5 6.6 0 12-5.3 12-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12 21.8c-1.8 0-3.5-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A9.8 9.8 0 0 1 2 11.9C2 6.5 6.5 2 12 2s10 4.4 10 9.9-4.5 9.9-10 9.9Zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}
export function TekoPitch() {
  const { t } = useLanguage();
  return (
    <section className="teko-pitch section-pad">
      <a
        href={tekoWebsite}
        target="_blank"
        rel="noreferrer"
        className="teko-wordmark"
        aria-label={t("Visitar o website da Teko", "Visit Teko’s website")}
      >
        teko<span>·</span>
      </a>
      <div>
        <Label>
          {t(
            "Da visão à presença digital.",
            "From vision to digital presence.",
          )}
        </Label>
        <h2>{t("Este é só o começo.", "This is just the beginning.")}</h2>
        <p>
          {t(
            "Esta demonstração foi criada pela Teko. Para concluir este projecto ou dar vida a uma nova ideia, fale connosco.",
            "This demo was created by Teko. To complete this project or bring a new idea to life, get in touch.",
          )}
        </p>
        <a
          className="teko-website-link text-link"
          href={tekoWebsite}
          target="_blank"
          rel="noreferrer"
        >
          {t("Conheça a Teko", "Discover Teko")}
          <Arrow />
        </a>
      </div>
      <div className="teko-contact-actions">
        <a
          className="button-link"
          href={tekoWhatsapp}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsappIcon />
          {t("Fale com a Teko", "Talk to Teko")}
          <Arrow />
        </a>
        <a className="teko-email-link" href="mailto:tekoo.aip@gmail.com">
          <MailIcon />
          <span>tekoo.aip@gmail.com</span>
        </a>
      </div>
    </section>
  );
}
