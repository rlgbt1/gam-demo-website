import agriculture2Video from "../assets/video/agriculture2.mp4";
import agriculture2Poster from "../assets/video/agriculture2-poster.jpg";
import ammilVideo from "../assets/video/ammil.mp4";
import ammilPoster from "../assets/video/ammil-poster.jpg";
import cclVideo from "../assets/video/ccl.mp4";
import cclPoster from "../assets/video/ccl-poster.jpg";
import mbakassyVideo from "../assets/video/mbakassy.mp4";
import mbakassyPoster from "../assets/video/mbakassy-poster.jpg";
import microcenterVideo from "../assets/video/microcenter.mp4";
import microcenterPoster from "../assets/video/microcenter-poster.jpg";
import syoilVideo from "../assets/video/syoil.mp4";
import syoilPoster from "../assets/video/syoil-poster.jpg";
import wastemgmtVideo from "../assets/video/waste-mgmt.mp4";
import wastemgmtPoster from "../assets/video/waste-mgmt-poster.jpg";
import agricultureVideo from "../assets/video/agriculture.mp4";
import agriculturePoster from "../assets/video/agriculture-poster.jpg";
import transportVideo from "../assets/video/trucks-logistics.mp4";
import oilVideo from "../assets/video/oil-gas.mp4";
import { assets } from "./content";
import sky from "../assets/animation/3.png";
import solar from "../assets/animation/5.png";
import refinery from "../assets/animation/6.png";
import pipes from "../assets/animation/7.png";
import steel from "../assets/animation/8.png";
import barrels from "../assets/animation/9.png";
import bus from "../assets/animation/10.png";
import crane from "../assets/animation/AfricaVectorPNG.png";
import journeyOil from "../assets/journey/oil.jpg";
import journeyAgriculture from "../assets/journey/agriculture.jpg";
import journeyIndustry from "../assets/journey/industry.jpg";
const videoClips = [
  {
    src: agricultureVideo,
    poster: agriculturePoster,
    label: ["Agricultura", "Agriculture"],
  },
  {
    src: transportVideo,
    poster: assets.trucks,
    label: ["Comércio e Transporte", "Trade & Transport"],
  },
  { src: oilVideo, poster: assets.oil, label: ["Oil & Gas", "Oil & Gas"] },
  {
    src: assets.skylineVideo,
    poster: assets.skyline,
    label: ["Luanda, Angola", "Luanda, Angola"],
  },
  {
    src: agriculture2Video,
    poster: agriculture2Poster,
    label: ["Agricultura e produção", "Agriculture & production"],
  },
  { src: ammilVideo, poster: ammilPoster, label: ["Ammil", "Ammil"] },
  {
    src: cclVideo,
    poster: cclPoster,
    label: ["Construção civil", "Construction"],
  },
  {
    src: mbakassyVideo,
    poster: mbakassyPoster,
    label: ["Mbakassy", "Mbakassy"],
  },
  {
    src: microcenterVideo,
    poster: microcenterPoster,
    label: ["Tecnologia", "Technology"],
  },
  { src: syoilVideo, poster: syoilPoster, label: ["SyOil", "SyOil"] },
  {
    src: wastemgmtVideo,
    poster: wastemgmtPoster,
    label: ["Gestão de resíduos", "Waste management"],
  },
];
// Keep the opening playlist independent of company-specific backgrounds.
export const heroClips = [
  videoClips[0],
  videoClips[1],
  videoClips[2],
  { ...videoClips[3], label: ["Construção civil", "Construction"] },
  { ...videoClips[7], label: ["Indústria", "Industry"] },
];
export function companyClip(id: string) {
  const dedicated: Record<string, number> = {
    ammil: 5,
    ccl: 6,
    mbakassy: 7,
    microcenter: 8,
    syoil: 9,
    envirobac: 10,
  };
  if (id in dedicated) return videoClips[dedicated[id]];
  if (["angoil", "falcon"].includes(id)) return videoClips[2];
  if (id === "bacatral") return videoClips[1];
  return videoClips[3];
}
export const animationAssets = {
  sky,
  solar,
  refinery,
  pipes,
  steel,
  barrels,
  bus,
  crane,
};
export const journeyPhotos = [journeyAgriculture, journeyIndustry, journeyOil];
