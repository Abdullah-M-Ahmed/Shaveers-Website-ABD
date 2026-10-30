import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Star, Shield, Gem, Users } from "lucide-react";

const values = [
  { icon: Heart, label: "Purpose Before Profit" },
  { icon: Star, label: "Crafted with Ihsan" },
  { icon: Shield, label: "Ethical and Transparent" },
  { icon: Gem, label: "Premium Quality Materials" },
  { icon: Users, label: "Designed for the Modern Muslim" },
];

const ValuesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="values" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            What We Stand For
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-16">
            Our <span className="text-gradient-gold font-medium">Values</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover px-6 py-4 flex items-center gap-3 glow-gold"
            >
              <value.icon size={18} className="text-accent flex-shrink-0" />
              <span className="font-body text-sm font-medium text-foreground tracking-wide">
                {value.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
