import { useEffect, useRef, useState } from 'react';
import styles from './AtScale.module.css';
import { stats } from '../../data/content';

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState('0');
  const numeric = Number(target.replace(/\./g, ''));

  useEffect(() => {
    if (!active || Number.isNaN(numeric)) {
      setDisplay(target);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(numeric * eased);
      setDisplay(current.toLocaleString('pt-PT'));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return display;
}

function Stat({ stat, active }: { stat: (typeof stats)[number]; active: boolean }) {
  const display = useCountUp(stat.value, active);
  return (
    <div className={styles.stat}>
      <div className={styles.value}>
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <p className={styles.label}>{stat.label}</p>
    </div>
  );
}

export default function AtScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="escala" className={styles.section} ref={ref}>
      <div className={`container ${styles.head}`}>
        <p className="kicker on-dark">O Grupo à escala</p>
        <h2>Um percurso de expansão consistente em Angola.</h2>
      </div>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat) => (
            <Stat key={stat.label} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
