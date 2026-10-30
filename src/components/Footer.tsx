const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              <span className="text-gradient-gold">Shaveers</span>
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
              Premium thawbs designed with sincerity, craftsmanship, and timeless Islamic values. 
              Modesty in every thread.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">
              Quick Links
            </h4>
            <div className="space-y-3">
              {["Shop", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-4 font-semibold">
              Support
            </h4>
            <div className="space-y-3">
              {["Sizing Guide", "Shipping", "Returns", "FAQ"].map((link) => (
                <a
                  key={link}
                  href="#faq"
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Shaveers. All rights reserved. Crafted with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
