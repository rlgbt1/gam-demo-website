import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatch = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = () => setMatches(mql.matches);
    listener();
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/** Verdadeiro quando o dispositivo deve ver a mecânica de scroll-pin completa (desktop, sem preferência de movimento reduzido). */
export function useWantsFullMotion(): boolean {
  const isWide = useMediaQuery('(min-width: 880px)');
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return isWide && !reduced;
}
