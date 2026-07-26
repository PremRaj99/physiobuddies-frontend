import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import BannerCard1 from './banner-card/banner-card1';
import BannerCard2 from './banner-card/banner-card2';
import BannerCard3 from './banner-card/banner-card3';

export default function Banner() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {/* We repeat cards to ensure a smooth loop */}
          {[1, 2, 3, 4].map((_, index) => (
            <React.Fragment key={index}>
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <BannerCard1 />
              </CarouselItem>
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <BannerCard2
                  mainHeading="Welcome Coupon"
                  coupon="FIRST100"
                  subHeading="₹ 100 OFF on First Consultation"
                />
              </CarouselItem>
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <BannerCard3 />
              </CarouselItem>
            </React.Fragment>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
