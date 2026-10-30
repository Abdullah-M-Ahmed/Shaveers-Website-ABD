import { WHATSAPP_LINK } from "@/lib/whatsapp";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Contact <span className="text-gradient-gold font-medium">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.name as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                  placeholder={`Your ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
            <div>
              <label className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <button type="submit" className="btn-primary-green flex items-center gap-2">
              <Send size={14} />
              Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Let's Connect
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                We'd love to hear from you. Whether you have a question about sizing, shipping, 
                or anything else, our team is ready to help.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "hello@thawbhouse.com", href: "mailto:hello@thawbhouse.com" },
                { icon: MessageCircle, label: "Chat on WhatsApp", href: WHATSAPP_LINK },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"

                  className="glass-card-hover flex items-center gap-4 px-6 py-4"
                >
                  <item.icon size={18} className="text-accent" />
                  <span className="font-body text-sm text-foreground">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
