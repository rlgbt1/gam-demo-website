import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LanguageProvider } from "./redesign/context";
import { useLanguage } from "./redesign/useLanguage";
import { Header, Footer } from "./redesign/ui";
import Home from "./redesign/Home";
import {
  Group,
  Founder,
  Companies,
  CompanyDetail,
  Sectors,
  Sustainability,
  Contact,
  ComingSoon,
  NotFound,
} from "./redesign/Pages";
function PageEffects() {
  const { pathname } = useLocation();
  const { t, lang } = useLanguage();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": t("Um só Grupo", "One Group"),
      "/grupo": t("O Grupo", "The Group"),
      "/fundador": t("O fundador", "The founder"),
      "/empresas": t("Empresas", "Companies"),
      "/sectores": t("Sectores", "Sectors"),
      "/contactos": t("Contactos", "Contact"),
      "/sustentabilidade": t("Sustentabilidade", "Sustainability"),
      "/actualidade": t("Actualidade", "News"),
      "/carreiras": t("Carreiras", "Careers"),
    };
    document.title = `${titles[pathname] || t("Empresas", "Companies")} | GAM — Grupo António Mosquito`;
  }, [pathname, lang, t]);
  return null;
}
function Site() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  return (
    <>
      <PageEffects />
      <a className="skip-link" href="#main">
        {t("Saltar para o conteúdo", "Skip to content")}
      </a>
      <Header key={pathname} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grupo" element={<Group />} />
          <Route path="/fundador" element={<Founder />} />
          <Route path="/empresas" element={<Companies />} />
          <Route path="/empresas/:id" element={<CompanyDetail />} />
          <Route path="/sectores" element={<Sectors />} />
          <Route path="/sustentabilidade" element={<Sustainability />} />
          <Route path="/contactos" element={<Contact />} />
          <Route path="/actualidade" element={<ComingSoon type="news" />} />
          <Route path="/carreiras" element={<ComingSoon type="careers" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Site />
      </BrowserRouter>
    </LanguageProvider>
  );
}
