import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import collectionImg from "@/assets/collection-signature.jpg";

const collections = [
  { name: "Signature Collection", desc: "Our flagship line of premium thawbs" },
  { name: "Jummah Collection", desc: "Elevated styles for Friday prayers" },
  { name: "Formal & Wedding", desc: "Celebration-worthy elegance" },
  { name: "Everyday Essentials", desc: "Comfort meets refined simplicity" },
  { name: "Limited Edition Drops", desc: "Exclusive seasonal releases" },
];

const CollectionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collections" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Our <span className="text-gradient-gold font-medium">Collections</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-card-hover overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={collectionImg}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-display text-xl font-semibold text-primary-foreground">
                    {col.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <p className="font-body text-sm text-muted-foreground">{col.desc}</p>
                <ArrowRight size={16} className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
