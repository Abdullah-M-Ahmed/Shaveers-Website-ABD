import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 gradient-hero opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Floating Shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-primary-foreground mb-8"
        >
          Modesty In
          <br />
          <span className="text-gradient-gold font-medium">Every Thread.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-base md:text-lg text-primary-foreground/60 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Premium thawbs designed with sincerity, craftsmanship, and timeless Islamic values.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#shop" className="btn-primary-green">
            Shop Collection
          </a>
          <a href="#lookbook" className="btn-outline-gold border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/10">
            View Lookbook
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
