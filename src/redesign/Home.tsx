import { lazy, Suspense, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets, companies, sectors } from "./content";
import { useLanguage } from "./useLanguage";
import { Arrow, ButtonLink, Label, TekoPitch } from "./ui";
import { heroClips, companyClip, animationAssets } from "./media";
import { Honeycomb } from "./GroupStory";
gsap.registerPlugin(ScrollTrigger);
// Load the coach separately; WebGL initializes only as its chapter approaches.
const HuamboCoach = lazy(() => import("./HuamboCoach"));
export function Stats() {
  const { t } = useLanguage();
  return (
    <section className="stats section-pad grid-lines" id="escala">
      <div className="stats-intro">
        <Label>{t("A dimensão do Grupo", "The Group at a glance")}</Label>
        <p>
          {t(
            "Uma presença que se traduz em capacidade.",
            "A presence that translates into capability.",
          )}
        </p>
      </div>
      {[
        [
          "≈20",
          t("Empresas geridas", "Companies managed"),
          t("Em Angola e além-fronteiras.", "In Angola and beyond."),
        ],
        [
          "≈$120M",
          t("Volume de negócios anual", "Annual turnover"),
          t("Em dólares norte-americanos.", "In US dollars."),
        ],
        [
          t("1.300+", "1,300+"),
          t("Colaboradores", "Employees"),
          t("Distribuídos por toda Angola.", "Across Angola."),
        ],
      ].map(([value, label, desc], i) => (
        <div className="stat" key={value}>
          <span className="stat-icon" aria-hidden="true">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              {i === 0 ? (
                <path d="M5 21V5l8-2v18M13 9h6v12M3 21h18M8 8h2M8 12h2M8 16h2M16 12v2M16 17v2" />
              ) : i === 1 ? (
                <>
                  <circle cx="12" cy="12" r="9" />
                  <ellipse cx="12" cy="12" rx="4" ry="9" />
                  <path d="M3 12h18M5 6h14M5 18h14" />
                </>
              ) : (
                <>
                  <circle cx="12" cy="8" r="3" />
                  <path d="M6 21v-3a6 6 0 0 1 12 0v3M5 7a3 3 0 0 0 0 6M19 7a3 3 0 0 1 0 6M2 20v-3a4 4 0 0 1 3-4M22 20v-3a4 4 0 0 0-3-4" />
                </>
              )}
            </svg>
          </span>
          <strong>{value}</strong>
          <h3>{label}</h3>
          <p>{desc}</p>
        </div>
      ))}
      <small className="source-note">
        {t(
          "Indicadores publicados na apresentação institucional do GAM.",
          "Figures published in GAM’s institutional profile.",
        )}
      </small>
    </section>
  );
}
// Frame the supplied PNG artwork by its alpha bounds, without altering source files.
const sceneBounds = {
  sky: [0, 326, 864, 901],
  refinery: [11, 336, 853, 896],
  solar: [28, 411, 864, 892],
  pipes: [86, 455, 777, 776],
  steel: [64, 364, 755, 869],
  barrels: [104, 379, 730, 915],
  bus: [32, 349, 833, 883],
  crane: [82, 317, 851, 1001],
};
// Clip the existing artwork into three independently moving pieces.
// Their final coordinates reproduce the original image without rescaling it.
const assemblyMasks = {
  steel: [
    "0,0 864,0 864,578 584,578 584,656 367,664 225,570 0,570",
    "0,570 225,570 367,664 550,659 550,1232 0,1232",
    "550,659 584,656 584,578 864,578 864,1232 550,1232",
  ],
  solar: [
    "0,0 864,0 864,550 710,570 146,576 0,576",
    "0,576 146,576 710,570 864,550 864,648 759,648 179,706 0,705",
    "0,705 179,706 759,648 864,648 864,1232 0,1232",
  ],
};
function AssemblyArtwork({ name }: { name: keyof typeof assemblyMasks }) {
  const id = useId().replace(/:/g, "");
  const [left, top, right, bottom] = sceneBounds[name];
  return (
    <svg
      viewBox={`${left} ${top} ${right - left} ${bottom - top}`}
      width="100%"
      height="100%"
      className="assembly-art"
      aria-hidden="true"
    >
      <defs>
        {assemblyMasks[name].map((points, i) => (
          <clipPath id={`${id}-${i}`} key={i}>
            <polygon points={points} />
          </clipPath>
        ))}
      </defs>
      {assemblyMasks[name].map((_, i) => (
        <g className={`assembly-part assembly-part-${i}`} key={i}>
          <image
            href={animationAssets[name]}
            width="864"
            height="1232"
            clipPath={`url(#${id}-${i})`}
          />
        </g>
      ))}
      <image
        className="assembly-complete"
        href={animationAssets[name]}
        width="864"
        height="1232"
        opacity="0"
      />
    </svg>
  );
}
function SceneAsset({
  name,
  className,
}: {
  name: keyof typeof animationAssets;
  className: string;
}) {
  const [left, top, right, bottom] = sceneBounds[name];
  const width = right - left;
  const height = bottom - top;
  return (
    <div
      className={`scene-frame ${className}${name === "bus" ? " huambo-coach-scene" : ""}`}
      style={{ aspectRatio: `${width}/${height}` }}
      aria-hidden="true"
    >
      {name === "bus" && (
        <Suspense fallback={null}><HuamboCoach /></Suspense>
      )}
      {name === "bus" ? (
        <svg className="huambo-coach-fallback" viewBox={`${left} ${top} ${width} ${height}`} preserveAspectRatio="xMinYMax meet" width="100%" height="100%">
          <image href={animationAssets.bus} width="864" height="1232" />
        </svg>
      ) : name === "steel" || name === "solar" ? (
        <AssemblyArtwork name={name} />
      ) : name === "sky" || name === "refinery" ? (
        <svg
          viewBox={`${left} ${top} ${width} ${height}`}
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        >
          <image href={animationAssets[name]} width="864" height="1232" />
        </svg>
      ) : (
        <img
          src={animationAssets[name]}
          alt=""
          style={{
            position: "absolute",
            maxWidth: "none",
            width: `${(864 / width) * 100}%`,
            height: `${(1232 / height) * 100}%`,
            left: `${(-left / width) * 100}%`,
            top: `${(-top / height) * 100}%`,
          }}
        />
      )}
    </div>
  );
}
function Manifesto() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: () =>
              `top ${window.innerWidth < 600 ? 76 : window.innerWidth < 900 ? 80 : 94}px`,
            end: () => `bottom ${window.innerHeight}px`,
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          ".manifesto-track",
          { x: 60 },
          {
            x: () =>
              -Math.max(
                0,
                (root.current?.querySelector(".manifesto-track")?.scrollWidth ||
                  0) -
                  (root.current?.clientWidth || 0) +
                  80,
              ),
            duration: 12,
            ease: "none",
          },
          0,
        );
        const chapters = [
          [".object-bus"],
          [".scene-sky"],
          [".object-steel"],
          [".object-crane"],
          [".scene-refinery"],
          [".object-solar"],
        ];
        {
          // Hold the opening pose, then keep turning through the unchanged fade at 1.45–1.90.
          tl.fromTo(".object-bus", { "--coach-turn": 0 }, {
            "--coach-turn": 1, duration: 1.7, ease: "none",
          }, 0.2);
        }
        chapters.forEach((targets, i) => {
          const start = i * 2;
          // Alternate a fade with a directional entrance; chapters never overlap.
          const assembles = i === 2 || i === 5;
          const flies = i % 2 === 1 && !assembles;
          const offset = i === 1 || i === 5 ? -90 : 90;
          gsap.set(targets, {
            autoAlpha: i === 0 ? 1 : 0,
            y: flies ? offset : 0,
          });
          if (i > 0) {
            if (flies) {
              tl.set(targets, { autoAlpha: 1 }, start);
              tl.to(
                targets,
                { y: 0, duration: 0.6, ease: "power2.out" },
                start,
              );
            } else {
              tl.to(
                targets,
                { autoAlpha: 1, duration: 0.45, ease: "power1.inOut" },
                start,
              );
            }
          }
          if (assembles) {
            const selector = targets[0];
            const offsets =
              i === 2
                ? [
                    [0, -125],
                    [-100, 45],
                    [100, 45],
                  ]
                : [
                    [0, -110],
                    [-100, 0],
                    [80, 55],
                  ];
            gsap.set(`${selector} .assembly-complete`, { autoAlpha: 0 });
            gsap.set(`${selector} .assembly-part`, { autoAlpha: 1 });
            tl.set(
              `${selector} .assembly-part`,
              { autoAlpha: 0 },
              start + 1.15,
            );
            tl.set(
              `${selector} .assembly-complete`,
              { autoAlpha: 1 },
              start + 1.15,
            );
            offsets.forEach(([x, y], piece) => {
              tl.fromTo(
                `${selector} .assembly-part-${piece}`,
                { x, y },
                { x: 0, y: 0, duration: 0.75, ease: "power2.out" },
                start + 0.1 + piece * 0.12,
              );
            });
          }
          if (flies) {
            tl.to(
              targets,
              { y: offset, duration: 0.45, ease: "power2.in" },
              start + 1.45,
            );
            tl.set(targets, { autoAlpha: 0 }, start + 1.9);
          } else {
            tl.to(
              targets,
              { autoAlpha: 0, duration: 0.45, ease: "power1.inOut" },
              start + 1.45,
            );
          }
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [lang]);
  return (
    <section
      ref={root}
      className="manifesto manifesto-expanded manifesto-clean"
      aria-label={t("A nossa visão", "Our vision")}
    >
      <div className="manifesto-stage grid-lines">
        <div className="manifesto-heading">
          <Label>{t("O que nos move", "What drives us")}</Label>
          <span>GAM / {t("Visão", "Vision")}</span>
        </div>
        <SceneAsset name="sky" className="manifesto-scenery scene-sky" />
        <SceneAsset
          name="refinery"
          className="manifesto-scenery scene-refinery"
        />
        <div className="manifesto-track" aria-hidden="true">
          {t(
            "Diversificar o hoje. Construir o amanhã.",
            "Diversifying today. Building the Angola of Tomorrow.",
          )}
        </div>
        <h2 className="sr-only">
          {t(
            "Diversificar o hoje. Construir o amanhã.",
            "Diversifying today. Building the Angola of Tomorrow.",
          )}
        </h2>
        {(["bus", "crane", "steel", "solar"] as const).map((name) => (
          <SceneAsset
            key={name}
            name={name}
            className={`manifesto-object object-${name}`}
          />
        ))}
      </div>
    </section>
  );
}
export function Portfolio() {
  const { t, index } = useLanguage();
  const featured = companies;
  const movie = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [moviePlaying, setMoviePlaying] = useState(false);
  const [active, setActive] = useState(0);
  const company = featured[active];
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const select = (n: number, focus = false) => {
    const next = (n + featured.length) % featured.length;
    setActive(next);
    setRequested(true);
    if (next === active) {
      if (movie.current) movie.current.currentTime = 0;
      movie.current?.play().catch(() => {});
    }
    requestAnimationFrame(() => {
      const tab = tabs.current[next];
      const strip = tab?.parentElement;
      if (tab && strip)
        strip.scrollTo({
          left: Math.max(0, tab.offsetLeft - strip.offsetLeft),
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
    });
    if (focus) tabs.current[next]?.focus();
  };
  useEffect(() => {
    if (requested) movie.current?.play().catch(() => {});
  }, [active, requested]);
  const clip = companyClip(company.id);
  return (
    <section
      className="portfolio section-pad"
      id="portfolio"
      aria-label={t("Empresas do Grupo", "Group companies")}
    >
      <video
        ref={movie}
        key={company.id}
        className="portfolio-background"
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setMoviePlaying(true)}
        onPause={() => setMoviePlaying(false)}
        aria-hidden="true"
      />
      <div className="portfolio-shade" />
      <div className="portfolio-content grid-lines">
        <div className="portfolio-top">
          <Label>{t("As nossas empresas", "Our companies")}</Label>
          <p>
            {t(
              "Diferentes especialidades. Uma visão partilhada para o desenvolvimento de Angola.",
              "Different specialities. A shared vision for Angola’s development.",
            )}
          </p>
        </div>
        <div
          className="portfolio-tabs"
          role="tablist"
          aria-label={t("Seleccionar empresa", "Select company")}
        >
          {featured.map((item, i) => (
            <button
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`company-tab-${i}`}
              aria-selected={active === i}
              aria-controls="company-panel"
              tabIndex={active === i ? 0 : -1}
              key={item.id}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  select(
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? featured.length - 1
                        : active + (e.key === "ArrowRight" ? 1 : -1),
                    true,
                  );
                }
              }}
            >
              <span className="company-tab-name">
                {item.name}
                <sup>(0{i + 1})</sup>
              </span>
              <span className="company-tab-sector">{item.sector[index]}</span>
            </button>
          ))}
        </div>
        <div className="portfolio-mobile-controls">
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(featured.length).padStart(2, "0")}
          </span>
          <button
            className="portfolio-play"
            onClick={() => {
              setRequested(true);
              if (moviePlaying) movie.current?.pause();
              else movie.current?.play().catch(() => {});
            }}
            aria-label={t(
              moviePlaying
                ? "Pausar vídeo da empresa"
                : "Reproduzir vídeo da empresa",
              moviePlaying ? "Pause company video" : "Play company video",
            )}
          >
            {moviePlaying ? "Ⅱ" : "▷"}
          </button>
          <div>
            <button
              onClick={() => select(active - 1)}
              aria-label={t("Empresa anterior", "Previous company")}
            >
              <Arrow direction="left" />
            </button>
            <button
              onClick={() => select(active + 1)}
              aria-label={t("Próxima empresa", "Next company")}
            >
              <Arrow />
            </button>
          </div>
        </div>
        <div
          role="tabpanel"
          id="company-panel"
          aria-labelledby={`company-tab-${active}`}
          className="portfolio-detail"
          tabIndex={0}
        >
          <h2 key={company.id}>
            {company.headline?.[index] ||
              t(
                "Especialidades distintas. Um só Grupo.",
                "Distinct specialities. One Group.",
              )}
          </h2>
          <div>
            <p>
              {company.description?.[index] ||
                t(
                  `${company.name} integra o portfólio de empresas do Grupo António Mosquito.`,
                  `${company.name} is part of Grupo António Mosquito’s company portfolio.`,
                )}
            </p>
            <ButtonLink to={`/empresas/${company.id}`}>
              {t("Conheça a", "Explore")} {company.name}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
export function SustainabilityBlock() {
  const { t } = useLanguage();
  return (
    <section className="sustainability-block section-pad grid-lines">
      <div>
        <Label>{t("Responsabilidade", "Responsibility")}</Label>
        <h2>
          {t(
            "O futuro constrói-se com responsabilidade.",
            "The future is built responsibly.",
          )}
        </h2>
        <p>
          {t(
            "Investir com segurança, qualidade e responsabilidade social. Um compromisso que orienta a visão do Grupo.",
            "Investing with safety, quality and social responsibility. A commitment that guides the Group’s vision.",
          )}
        </p>
        <ButtonLink to="/sustentabilidade" dark>
          {t("O nosso compromisso", "Our commitment")}
        </ButtonLink>
      </div>
      <div className="sustainability-art">
        <div className="orbit" />
        <img
          src={assets.team}
          alt={t(
            "Equipa junto a autocarros Huambo Expresso",
            "Team beside Huambo Expresso buses",
          )}
          loading="lazy"
        />
        <span className="art-tag">
          {t("Pessoas no centro", "People at the centre")}
        </span>
        <div className="art-dot" />
        <div className="art-rings" aria-hidden="true" />
      </div>
    </section>
  );
}
export default function Home() {
  const { t, index } = useLanguage();
  const [clipIndex, setClipIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const clip = heroClips[clipIndex];
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches || userPaused) {
        video.current?.pause();
      } else {
        video.current?.play().catch(() => {});
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [clipIndex, userPaused]);
  return (
    <>
      <section className="hero">
        <video
          ref={video}
          key={clipIndex}
          src={clip.src}
          poster={clip.poster}
          muted
          onEnded={() => setClipIndex((i) => (i + 1) % heroClips.length)}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="hero-shade" />
        <div className="hero-grid grid-lines">
          <div className="hero-eyebrow">
            <Label>GAM — Grupo António Mosquito</Label>
            <span>Luanda, Angola</span>
          </div>
          <div className="hero-main">
            <h1>
              {t(
                "Décadas a construir a Angola de hoje.",
                "Decades building the Angola of today.",
              )}
            </h1>
            <div className="hero-aside">
              <p>
                {t(
                  "Unimos empresas, pessoas e sectores. Com raízes em Angola e uma visão que vai além-fronteiras.",
                  "Connecting companies, people and sectors. Rooted in Angola, with a vision that reaches beyond borders.",
                )}
              </p>
              <ButtonLink to="/grupo">
                {t("Descubra o GAM", "Discover GAM")}
              </ButtonLink>
            </div>
          </div>
          <div
            className="hero-clip-picker"
            aria-label={t("Seleccionar vídeo", "Select video")}
          >
            {heroClips.map((item, i) => (
              <button
                key={item.src}
                aria-pressed={i === clipIndex}
                onClick={() => setClipIndex(i)}
                aria-label={item.label[index]}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <i />
              </button>
            ))}
          </div>
          <div className="hero-bottom">
            <a href="#introducao">
              {t("Continue a explorar", "Scroll to explore")}
              <Arrow direction="down" />
            </a>
            <div>
              <span>{clip.label[index]}</span>
              <button
                className="video-control"
                aria-label={t(
                  playing ? "Pausar vídeo" : "Reproduzir vídeo",
                  playing ? "Pause video" : "Play video",
                )}
                onClick={() => {
                  setUserPaused(playing);
                  if (playing) video.current?.pause();
                  else video.current?.play().catch(() => {});
                }}
              >
                {playing ? "Ⅱ" : "▷"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="intro section-pad grid-lines" id="introducao">
        <div className="intro-identity">
          <Label>{t("O Grupo", "The Group")}</Label>
          <Honeycomb compact />
        </div>
        <div>
          <h2>
            {t(
              "Um grupo angolano. Uma presença diversificada. Um compromisso com o desenvolvimento.",
              "An Angolan group. A diversified presence. A commitment to development.",
            )}
          </h2>
          <div className="intro-bottom">
            <p>
              {t(
                "O GAM reúne empresas de diferentes sectores, com investimentos em Angola e além-fronteiras. Uma gestão integrada, orientada para o cliente e para a qualidade.",
                "GAM brings together companies across different sectors, with investments in Angola and beyond. Integrated management, focused on customers and quality.",
              )}
            </p>
            <Link className="text-link" to="/grupo">
              {t("Conheça o Grupo", "Meet the Group")}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <Manifesto />
      <Stats />
      <div className="stats-sector-cta">
        <Link className="text-link" to="/sectores">
          {t("Explore os nossos sectores", "Explore our sectors")}
          <Arrow />
        </Link>
      </div>
      <section className="sectors-preview section-pad grid-lines">
        <Label>{t("Sectores de actividade", "Business sectors")}</Label>
        <h2>
          {t("Diversidade de negócios.", "Diversity in business.")}
          <br />
          {t("Unidade de propósito.", "Unity of purpose.")}
        </h2>
        <div className="sector-mini-grid">
          {sectors
            .filter((_, i) => [0, 1, 5, 7].includes(i))
            .map(([pt, en], i) => (
              <Link to="/sectores" key={pt}>
                <span>
                  0{i + 1}
                  <Arrow />
                </span>
                <h3>{t(pt, en)}</h3>
              </Link>
            ))}
        </div>
        <Link className="text-link" to="/sectores">
          {t("Todos os sectores", "All sectors")}
          <Arrow />
        </Link>
      </section>
      <Portfolio />
      <SustainabilityBlock />
      <TekoPitch />
    </>
  );
}
