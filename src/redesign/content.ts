import logo from "../assets/photos/gam-logo.png";
import chairman from "../assets/photos/chairman.png";
import team from "../assets/photos/team-huambo.jpg";
import bus from "../assets/photos/huambo-bus-front.jpg";
import skyline from "../assets/video/luanda-skyline-poster.jpg";
import skylineVideo from "../assets/video/luanda-skyline.mp4";
import oil from "../assets/video/oil-gas-poster.jpg";
import trucks from "../assets/video/trucks-logistics-poster.jpg";
import busCutout from "../assets/scenes/bus-cutout.png";
import barrels from "../assets/scenes/barrels-cutout.png";
import beam from "../assets/scenes/beam-cutout.png";
import bacatral from "../assets/logos/bacatral.jpg";
import angoil from "../assets/logos/angoil.jpg";
import ccl from "../assets/logos/ccl.jpg";
import microcenter from "../assets/logos/microcenter.jpg";
import mbakassy from "../assets/logos/mbassy.jpg";
import falcon from "../assets/logos/falcon.png";
import syoil from "../assets/logos/syoil.jpg";
import ammil from "../assets/logos/ammil.jpg";
import envirobac from "../assets/logos/envirobac.jpg";
export const assets = {
  logo,
  chairman,
  team,
  bus,
  skyline,
  skylineVideo,
  oil,
  trucks,
  busCutout,
  barrels,
  beam,
};
export type Lang = "pt" | "en";
export const companies = [
  {
    id: "bacatral",
    name: "Bacatral",
    logo: bacatral,
    sector: ["Comércio e Transporte", "Trade & Transport"],
    category: "transport",
    image: trucks,
    headline: [
      "Capacidade que põe o país em movimento.",
      "Capacity that keeps the country moving.",
    ],
    description: [
      "Máquinas e transporte pesado no portfólio do Grupo António Mosquito.",
      "Machinery and heavy transport within the Grupo António Mosquito portfolio.",
    ],
  },
  {
    id: "angoil",
    name: "Angoil",
    logo: angoil,
    sector: ["Oil & Gas", "Oil & Gas"],
    category: "energy",
    image: oil,
    headline: [
      "Uma presença no sector petrolífero.",
      "A presence in the oil sector.",
    ],
    description: [
      "A Angoil integra o conjunto de empresas apresentado pelo GAM. Conheça as empresas do Grupo e as suas áreas de actividade.",
      "Angoil is part of the company portfolio presented by GAM. Discover the Group’s companies and areas of activity.",
    ],
  },
  {
    id: "ccl",
    name: "CCL",
    logo: ccl,
    sector: ["Construção Civil", "Civil Construction"],
    category: "construction",
    image: skyline,
    headline: [
      "Construção civil. Uma visão de futuro.",
      "Civil construction. A vision for the future.",
    ],
    description: [
      "CCL — Construção Civil, Lda. Uma das empresas que integram o portfólio diversificado do Grupo.",
      "CCL — Construção Civil, Lda. One of the companies in the Group’s diversified portfolio.",
    ],
  },
  {
    id: "microcenter",
    name: "Microcenter",
    logo: microcenter,
    sector: ["Tecnologia", "Technology"],
    category: "other",
    image: skyline,
  },
  {
    id: "mbakassy",
    name: "Mbakassy",
    logo: mbakassy,
    sector: ["Casa fundada em 1980", "Established in 1980"],
    category: "other",
    image: bus,
  },
  {
    id: "falcon",
    name: "Falcon Oil",
    logo: falcon,
    sector: ["Holding Angola, S.A.", "Holding Angola, S.A."],
    category: "energy",
    image: oil,
  },
  {
    id: "syoil",
    name: "SyOil",
    logo: syoil,
    sector: ["Comércio e Indústria de Petróleos", "Oil Trade & Industry"],
    category: "energy",
    image: oil,
    headline: ["Comércio e indústria de petróleos.", "Oil trade and industry."],
    description: [
      "SyOil — Comércio e Indústria de Petróleos, Lda. Uma das empresas apresentadas no portfólio do Grupo António Mosquito.",
      "SyOil — Comércio e Indústria de Petróleos, Lda. One of the companies presented in Grupo António Mosquito’s portfolio.",
    ],
  },
  {
    id: "ammil",
    name: "Ammil",
    logo: ammil,
    sector: ["Alimentos, Lda.", "Alimentos, Lda."],
    category: "other",
    image: team,
  },
  {
    id: "envirobac",
    name: "EnviroBac",
    logo: envirobac,
    sector: ["Gestão de Resíduos", "Waste Management"],
    category: "other",
    image: team,
    headline: [
      "Responsabilidade que faz parte do Grupo.",
      "Responsibility that is part of the Group.",
    ],
    description: [
      "A EnviroBac representa a gestão de resíduos no conjunto de empresas apresentado pelo GAM.",
      "EnviroBac represents waste management within the company portfolio presented by GAM.",
    ],
  },
];
export const sectors = [
  ["Comércio e Transporte", "Trade & Transport"],
  ["Construção Civil", "Civil Construction"],
  ["Hotelaria", "Hospitality"],
  ["Imobiliária", "Real Estate"],
  ["Banca", "Banking"],
  ["Agricultura e Pecuária", "Agriculture & Livestock"],
  ["Indústria", "Industry"],
  ["Oil & Gas", "Oil & Gas"],
];
export const values = [
  ["Inovação", "Innovation"],
  ["Colaboração", "Collaboration"],
  ["Integridade", "Integrity"],
  ["Diversidade", "Diversity"],
  ["Confiança", "Trust"],
  ["Qualidade", "Quality"],
];
