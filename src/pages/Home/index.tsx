import ActionCTA from '@/components/custom/cta/cta';
import Hero from './components/hero';
import OurExpertise from './components/our-expertise';
import Banner from './components/banner';
import Services from './components/our-service';
import WhyChooseUs from './components/why-choose-us';
import FAQ from './components/faq';
import Footer from '@/components/custom/footer/footer';
import { useHome } from './hooks/useHome';

export default function Home() {
  useHome();

  return (
    <div className="h-body w-full">
      <Hero />
      <OurExpertise />
      <Banner />
      <Services />
      <WhyChooseUs />
      <FAQ />
      {/* CTA Section */}
      <ActionCTA />

      <Footer />
    </div>
  );
}
