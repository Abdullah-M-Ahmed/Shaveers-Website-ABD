import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What sizes do you offer?",
    a: "We offer sizes from S to XXL with detailed measurement guides to help you find the perfect fit.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. International delivery options are available at checkout.",
  },
  {
    q: "How long does delivery take?",
    a: "Local orders take 3 to 5 business days. International shipping depends on your location, typically 7–14 days.",
  },
  {
    q: "What fabric do you use?",
    a: "We use premium breathable fabrics carefully selected for comfort, durability, and a luxurious drape.",
  },
  {
    q: "Can I return or exchange?",
    a: "Yes, exchanges are available within 7 days under our return policy. Items must be unworn with tags attached.",
  },
  {
    q: "Are your designs aligned with Islamic values?",
    a: "Absolutely. Our brand is rooted in modesty, sincerity, and ethical craftsmanship. Every design reflects Islamic principles.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding bg-secondary/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Common Questions
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Frequently <span className="text-gradient-gold font-medium">Asked</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card border-none px-6"
              >
                <AccordionTrigger className="font-display text-lg font-medium text-foreground hover:no-underline hover:text-accent transition-colors py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
