import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import storyImage from "@/assets/story-stone.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
              Rooted in <span className="text-gradient-gold font-medium">Faith</span>,
              <br />Refined by <span className="text-gradient-gold font-medium">Design</span>
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              We design and craft thawbs that reflect dignity, simplicity, and excellence. 
              Rooted in Islamic values and refined aesthetics, our garments are made for men 
              who value modesty, character, and timeless elegance.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Every stitch carries intention. Every fabric is chosen with care. 
              We believe that what you wear should honor your faith and inspire confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
          >
            <div className="glass-card overflow-hidden">
              <img
                src={storyImage}
                alt="Shaveers Stone Thobe detail, mandarin collar and zip placket"
                className="w-full h-auto aspect-[4/5] object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
