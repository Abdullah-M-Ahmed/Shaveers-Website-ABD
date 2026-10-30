import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import lookbook from "@/assets/purpose-black.jpg";

const LookbookSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="lookbook" className="section-padding bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait image, shown in full */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="glass-card overflow-hidden">
              <img
                src={lookbook}
                alt="Shaveers Black Thobe worn with intention"
                className="w-full h-auto aspect-[4/5] object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-accent/10 blur-2xl -z-10" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
              The Lookbook
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-8">
              Live with <span className="text-gradient-gold font-medium">Purpose</span>
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              A thobe built for the rhythm of the day, prayer, work, and everything
              between. Half-zip collar, wudhu-friendly sleeves, and clean lines that
              carry from the masjid to the street.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-md">
              {[
                { label: "Half-zip collar", detail: "Clean, structured neckline" },
                { label: "Wudhu friendly", detail: "Zip sleeves, no fuss" },
                { label: "Zip pockets", detail: "Secure. Subtle. Sharp." },
                { label: "All-day fabric", detail: "Breathable, holds its drape" },
              ].map((item) => (
                <div key={item.label} className="border-l border-accent/40 pl-4">
                  <p className="font-body text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
