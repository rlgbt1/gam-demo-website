import { useState, useEffect } from "react";
import { LanguageContext } from "./useLanguage";
import type { ReactNode } from "react";
import type { Lang } from "./content";
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("gam-language") === "en" ? "en" : "pt";
    } catch {
      return "pt";
    }
  });
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-AO" : "en";
    try {
      localStorage.setItem("gam-language", lang);
    } catch {
      /* Storage can be disabled. */
    }
  }, [lang]);
  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: (pt, en) => (lang === "pt" ? pt : en),
        index: lang === "pt" ? 0 : 1,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
