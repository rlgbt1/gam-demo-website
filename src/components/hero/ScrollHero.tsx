import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollHero.module.css';
import { heroHeadline, sectors } from '../../data/content';

import trucksVideo from '../../assets/video/trucks-logistics.mp4';
import trucksPoster from '../../assets/video/trucks-logistics-poster.jpg';
import oilVideo from '../../assets/video/oil-gas.mp4';
import oilPoster from '../../assets/video/oil-gas-poster.jpg';
import skylineVideo from '../../assets/video/luanda-skyline.mp4';
import skylinePoster from '../../assets/video/luanda-skyline-poster.jpg';
import agricultureVideo from '../../assets/video/agriculture.mp4';
import agriculturePoster from '../../assets/video/agriculture-poster.jpg';
import finalVideo from '../../assets/video/luanda-skyline.mp4';
import finalPoster from '../../assets/video/luanda-skyline-poster.jpg';

import busCutout from '../../assets/scenes/bus-cutout.png';
import barrelsCutout from '../../assets/scenes/barrels-cutout.png';
import beamCutout from '../../assets/scenes/beam-cutout.png';
import gamLogo from '../../assets/photos/gam-logo.png';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  { id: 'transporte', video: trucksVideo, poster: trucksPoster },
  { id: 'petroleos', video: oilVideo, poster: oilPoster },
  { id: 'construcao', video: skylineVideo, poster: skylinePoster },
  { id: 'agricultura', video: agricultureVideo, poster: agriculturePoster },
];

const marqueeText = `${sectors.join(' · ')} · Petróleos · `;

export default function ScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const finalSceneRef = useRef<HTMLDivElement>(null);
  const marqueeLayerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const busRef = useRef<HTMLDivElement>(null);
  const barrelsRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const loaderLayerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const finalLayerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const scenes = sceneRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!stage || !scenes.length) return;

      gsap.set(scenes[0], { opacity: 1 });
      gsap.set([busRef.current, barrelsRef.current, beamRef.current, markRef.current], {
        opacity: 0,
        y: 46,
      });
      gsap.set(finalSceneRef.current, { opacity: 0 });
      gsap.set(loaderLayerRef.current, { opacity: 0 });
      gsap.set(finalLayerRef.current, { opacity: 0 });

      const cutoutRefs = [busRef.current, barrelsRef.current, beamRef.current, markRef.current];

      const D_SCENES = 6; // duração (unidades de tempo da timeline) da passagem pelas 4 cenas
      const D_COLLAPSE = 2; // encolher para o loader
      const D_EXPAND = 2; // expandir para o hero final
      const perScene = D_SCENES / SCENES.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
        defaults: { ease: 'none' },
      });

      // --- Fase 1: marquee + cenas sincronizadas -----------------------------
      tl.to(marqueeTrackRef.current, { xPercent: -42, duration: D_SCENES }, 0);

      scenes.forEach((scene, i) => {
        const start = i * perScene;
        if (i > 0) {
          tl.to(scene, { opacity: 1, duration: perScene * 0.32 }, start);
          tl.to(scenes[i - 1], { opacity: 0, duration: perScene * 0.32 }, start);
        }

        const cutout = cutoutRefs[i];
        if (cutout) {
          tl.fromTo(
            cutout,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: perScene * 0.36, ease: 'power2.out' },
            start + perScene * 0.18,
          );
          tl.to(cutout, { opacity: 0, y: -40, duration: perScene * 0.3 }, start + perScene * 0.72);
        }
      });

      // cena final (skyline) entra por baixo mesmo antes do encolher começar
      tl.to(finalSceneRef.current, { opacity: 1, duration: 0.6 }, D_SCENES - 0.4);
      tl.to(scenes[scenes.length - 1], { opacity: 0, duration: 0.6 }, D_SCENES - 0.4);

      // --- Fase 2: encolher para o loader ------------------------------------
      tl.to(marqueeLayerRef.current, { opacity: 0, duration: 0.5 }, D_SCENES);
      tl.to(
        stage,
        {
          width: '220px',
          height: '150px',
          borderRadius: '20px',
          duration: D_COLLAPSE * 0.7,
          ease: 'power2.inOut',
        },
        D_SCENES + 0.15,
      );
      tl.to(loaderLayerRef.current, { opacity: 1, duration: 0.35 }, D_SCENES + 0.2);

      const counterState = { val: 0 };
      tl.to(
        counterState,
        {
          val: 99,
          duration: D_COLLAPSE * 0.75,
          ease: 'power1.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counterState.val)).padStart(2, '0');
            }
          },
        },
        D_SCENES + 0.25,
      );
      tl.to(loaderLayerRef.current, { opacity: 0, duration: 0.3 }, D_SCENES + D_COLLAPSE - 0.35);

      // --- Fase 3: expandir para o hero definitivo ---------------------------
      const expandStart = D_SCENES + D_COLLAPSE;
      tl.to(
        stage,
        {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          duration: D_EXPAND * 0.65,
          ease: 'power3.inOut',
        },
        expandStart,
      );
      tl.to(finalLayerRef.current, { opacity: 1, duration: 0.6 }, expandStart + 0.55);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className={styles.wrap} aria-label="Apresentação do GAM">
      <div ref={pinRef} className={styles.pin}>
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.stageBg}>
            {SCENES.map((scene, i) => (
              <div
                key={scene.id}
                ref={(el) => {
                  sceneRefs.current[i] = el;
                }}
                className={styles.sceneLayer}
              >
                <video src={scene.video} poster={scene.poster} muted loop playsInline autoPlay preload="auto" />
              </div>
            ))}
            <div ref={finalSceneRef} className={styles.sceneLayer}>
              <video src={finalVideo} poster={finalPoster} muted loop playsInline autoPlay preload="auto" />
            </div>
            <div className={styles.scrim} />
          </div>

          <div ref={marqueeLayerRef} className={`${styles.layer} ${styles.marqueeLayer}`}>
            <div ref={marqueeTrackRef} className={styles.marqueeTrack}>
              <span>{marqueeText}</span>
              <span>{marqueeText}</span>
              <span>{marqueeText}</span>
            </div>

            <div ref={busRef} className={`${styles.cutout} ${styles.cutoutBus}`}>
              <img src={busCutout} alt="" />
            </div>
            <div ref={barrelsRef} className={`${styles.cutout} ${styles.cutoutBarrels}`}>
              <img src={barrelsCutout} alt="" />
            </div>
            <div ref={beamRef} className={`${styles.cutout} ${styles.cutoutBeam}`}>
              <img src={beamCutout} alt="" />
            </div>
            <div ref={markRef} className={styles.markPlate}>
              <img src={gamLogo} alt="GAM" />
            </div>
          </div>

          <div ref={loaderLayerRef} className={`${styles.layer} ${styles.loaderLayer}`}>
            <span className={styles.loaderCount} ref={counterRef}>
              00
            </span>
            <span className={styles.loaderLabel}>A carregar o Grupo</span>
          </div>

          <div ref={finalLayerRef} className={`${styles.layer} ${styles.finalLayer}`}>
            <div className={styles.finalInner}>
              <p className="kicker on-dark">{heroHeadline.kicker}</p>
              <h1>{heroHeadline.title}</h1>
              <p className={styles.finalSub}>{heroHeadline.subtitle}</p>
              <div className={styles.finalActions}>
                <Link to="/grupo" className="btn btn-gold">
                  Descubra o GAM
                </Link>
                <a href="#escala" className="btn btn-outline" style={{ color: 'var(--paper)' }}>
                  Ver números do Grupo
                </a>
              </div>
            </div>
            <span className={styles.scrollCue}>
              Continue a percorrer
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
