import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import gamLogo from '../../assets/photos/gam-logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          <img src={gamLogo} alt="GAM — Grupo António Mosquito" />
        </Link>

        <nav className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
          <NavLink to="/grupo" className={({ isActive }) => (isActive ? styles.active : '')}>
            Grupo
          </NavLink>
        </nav>

        <Link to="/grupo" className={`btn btn-primary ${styles.cta}`}>
          Descubra o GAM
        </Link>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className={`${styles.menuBtn} ${open ? styles.open : ''}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </header>

      <div className={`${styles.mobilePanel} ${open ? styles.open : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/grupo" onClick={() => setOpen(false)}>
          Grupo
        </Link>
        <Link to="/grupo" className="btn btn-gold" onClick={() => setOpen(false)}>
          Descubra o GAM
        </Link>
      </div>
    </>
  );
}
