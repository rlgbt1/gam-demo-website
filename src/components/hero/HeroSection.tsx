import { useWantsFullMotion } from '../../hooks/useMediaQuery';
import ScrollHero from './ScrollHero';
import SimpleHero from './SimpleHero';

/** Escolhe a mecânica de scroll-pin completa (desktop) ou a versão leve (mobile / reduced-motion). */
export default function HeroSection() {
  const fullMotion = useWantsFullMotion();
  return fullMotion ? <ScrollHero /> : <SimpleHero />;
}
