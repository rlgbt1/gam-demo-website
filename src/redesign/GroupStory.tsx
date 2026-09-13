import { useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyPhotos } from "./media";
import { useLanguage } from "./useLanguage";
import { Arrow, Label } from "./ui";
gsap.registerPlugin(ScrollTrigger);
export function Honeycomb({ compact = false }: { compact?: boolean }) {
  const gradientId = useId();
  const root = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const offsets = [
          { x: -115, y: -40, rotation: -22 },
          { x: -90, y: 65, rotation: 20 },
          { x: 125, y: 45, rotation: 30 },
        ];
        root.current?.querySelectorAll(".honey-cell").forEach((cell, i) => {
          gsap.fromTo(cell, offsets[i], {
            x: 0,
            y: 0,
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "center 48%",
              scrub: 1,
            },
          });
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return (
    <section
      ref={root}
      className={
        compact
          ? "honeycomb-compact"
          : "honeycomb-section section-pad grid-lines"
      }
    >
      {!compact && (
        <div>
          <Label>{t("O Grupo", "The Group")}</Label>
          <h2>
            {t(
              "Diferentes caminhos. Uma identidade.",
              "Different paths. One identity.",
            )}
          </h2>
        </div>
      )}
      <svg
        className="honeycomb"
        viewBox="-100 -75 530 370"
        role="img"
        aria-label={t(
          "Três hexágonos reúnem-se no símbolo do GAM",
          "Three hexagons unite to form the GAM symbol",
        )}
      >
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0" stopColor="#ffe997" />
            <stop offset=".7" stopColor="#edc849" />
            <stop offset="1" stopColor="#c99e2d" />
          </radialGradient>
        </defs>
        {[
          { x: 165, y: 65 },
          { x: 108, y: 166 },
          { x: 222, y: 166 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <g className="honey-cell">
              <path
                d="M0 -64 55 -32 55 32 0 64 -55 32 -55 -32Z"
                fill={`url(#${gradientId})`}
                stroke="#f6d870"
                strokeWidth="4"
              />
            </g>
          </g>
        ))}
      </svg>
    </section>
  );
}
const dates = [1974, 1980, 1990, 2000, 2010, 2026];
export function Journey() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const change = (delta: number) =>
    setActive((i) => (i + delta + dates.length) % dates.length);
  return (
    <section
      className="journey section-pad grid-lines"
      aria-label={t("A nossa história", "Our history")}
    >
      <Label>{t("A nossa história", "Our history")}</Label>
      <h2>
        {t("Décadas de caminho percorrido.", "A journey across decades.")}
      </h2>
      <div className="journey-main">
        <div className="journey-photos">
          {journeyPhotos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={t(
                ["Agricultura", "Indústria", "Oil & Gas"][i],
                ["Agriculture", "Industry", "Oil & Gas"][i],
              )}
              className={i === active % 3 ? "selected" : ""}
              loading="lazy"
            />
          ))}
        </div>
        <div className="journey-date">
          <strong aria-live="polite">{dates[active]}</strong>
          {active === 0 && <span>{t("O início", "The beginning")}</span>}
          <div className="journey-arrows">
            <button
              onClick={() => change(-1)}
              aria-label={t("Data anterior", "Previous date")}
            >
              <Arrow direction="left" />
            </button>
            <button
              onClick={() => change(1)}
              aria-label={t("Próxima data", "Next date")}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      <div
        className="journey-dates"
        aria-label={t("Escolha uma data", "Choose a date")}
      >
        {dates.map((date, i) => (
          <button
            aria-pressed={active === i}
            key={date}
            onClick={() => setActive(i)}
          >
            {date}
            <i />
          </button>
        ))}
      </div>
    </section>
  );
}
