import { createContext, useContext } from "react";
import type { Lang } from "./content";
export const LanguageContext = createContext({
  lang: "pt" as Lang,
  setLang: (_lang: Lang) => {},
  t: (pt: string, _en: string) => pt,
  index: 0,
});
export const useLanguage = () => useContext(LanguageContext);
