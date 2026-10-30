import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The quality and stitching are unmatched. It feels dignified and premium.",
    author: "Ahmed R.",
    location: "Lahore, Pakistan",
  },
  {
    text: "Finally, a brand that understands modesty without compromising on modern style.",
    author: "Yusuf M.",
    location: "Karachi, Pakistan",
  },
  {
    text: "I wore the Black Thobe to Jummah and received so many compliments. Truly exceptional.",
    author: "Ibrahim K.",
    location: "Islamabad, Pakistan",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            What Our <span className="text-gradient-gold font-medium">Brothers</span> Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card-hover p-8 animate-float"
              style={{ animationDelay: `${i * 2}s` }}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="font-display text-lg italic text-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-body text-sm font-semibold text-foreground">{t.author}</p>
                <p className="font-body text-xs text-muted-foreground">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
