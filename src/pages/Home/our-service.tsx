import { motion, type Variants } from 'framer-motion';
import OfferedServiceCard from './offered-service';
// Assuming this is your data source
import { offerredServices } from '@/data/dummy/offeredServices';

export default function Services() {
  // Animation variants for the container to stagger children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-background px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={headerVariants}
          className="mx-auto mb-8 max-w-3xl space-y-4 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#012a4a] md:text-5xl">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg text-[#012a4a]/70">
            Your Complete Physiotherapy Solution, All in One Platform.
          </p>
          <div className="bg-primary/20 mx-auto mt-6 h-1 w-20 rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {offerredServices.map((service, index) => (
            <OfferedServiceCard
              key={index}
              title={service.title}
              subheading={service.subheading}
              img={service.img}
              p={service.p}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
