import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Garante que a navegação entre páginas começa sempre no topo. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
