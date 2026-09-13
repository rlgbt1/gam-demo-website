import HeroSection from '../components/hero/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import AtScale from '../components/sections/AtScale';
import PortfolioStrip from '../components/sections/PortfolioStrip';
import FinalCta from '../components/sections/FinalCta';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <AtScale />
      <PortfolioStrip />
      <FinalCta />
    </main>
  );
}
