import ActionCTA from '@/components/custom/cta/cta';
import Hero from './hero';
import OurExpertise from './our-expertise';
import Banner from './banner';
import Services from './our-service';
import WhyChooseUs from './why-choose-us';
import FAQ from './faq';
import Footer from '@/components/custom/footer/footer';

export default function index() {
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
