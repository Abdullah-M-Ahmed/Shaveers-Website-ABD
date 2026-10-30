import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const OWNER_WHATSAPP = "923290808905";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number is required").max(20),
  email: z.string().trim().email("Valid email is required").max(255),
  address: z.string().trim().min(5, "Full address is required").max(500),
  city: z.string().trim().min(2, "City is required").max(100),
  notes: z.string().trim().max(500).optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar alwaysGold />
        <div className="pt-32 pb-20 flex flex-col items-center justify-center gap-4">
          <h1 className="font-display text-3xl">Your cart is empty</h1>
          <button onClick={() => navigate("/")} className="btn-primary-green">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const buildWhatsAppMessage = (isOwner: boolean) => {
    const orderItems = items
      .map(
        (item) =>
          `• ${item.product.name} (Size: ${item.size}) x${item.quantity}, ${(item.product.priceNum * item.quantity).toLocaleString()} PKR`
      )
      .join("\n");

    if (isOwner) {
      return `🛒 *New Order Received!*\n\n*Customer Details:*\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nAddress: ${form.address}\n${form.notes ? `Notes: ${form.notes}\n` : ""}\n*Order Items:*\n${orderItems}\n\n*Total: ${totalPrice.toLocaleString()} PKR*`;
    }

    return `✅ *Order Confirmation, Shaveers*\n\nThank you for your order, ${form.name}!\n\n*Your Order:*\n${orderItems}\n\n*Total: ${totalPrice.toLocaleString()} PKR*\n\nWe'll process your order shortly. 🙏`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof CheckoutForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Open WhatsApp to owner with order details
    const ownerMsg = encodeURIComponent(buildWhatsAppMessage(true));
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${ownerMsg}`, "_blank");

    // Open WhatsApp to customer with confirmation
    const customerPhone = form.phone.replace(/[^0-9]/g, "");
    const customerMsg = encodeURIComponent(buildWhatsAppMessage(false));
    setTimeout(() => {
      window.open(`https://wa.me/${customerPhone}?text=${customerMsg}`, "_blank");
    }, 1000);

    toast({ title: "Order placed! Check WhatsApp for confirmation." });
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysGold />
      <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-light mb-10"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
          >
            <h2 className="font-display text-xl font-semibold mb-4">Your Details</h2>

            {([
              { name: "name", label: "Full Name", type: "text", placeholder: "Muhammad Ali" },
              { name: "phone", label: "WhatsApp Number", type: "tel", placeholder: "+92 325 XXXXXXX" },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              { name: "city", label: "City", type: "text", placeholder: "Lahore" },
            ] as const).map((field) => (
              <div key={field.name}>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-foreground mb-1.5 font-semibold">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all ${
                    errors[field.name] ? "border-destructive" : "border-border/50"
                  }`}
                />
                {errors[field.name] && (
                  <p className="text-destructive text-xs font-body mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-foreground mb-1.5 font-semibold">
                Full Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House #, Street, Area"
                rows={2}
                className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none ${
                  errors.address ? "border-destructive" : "border-border/50"
                }`}
              />
              {errors.address && (
                <p className="text-destructive text-xs font-body mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-foreground mb-1.5 font-semibold">
                Order Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any special instructions..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary-green w-full flex items-center justify-center gap-2 !py-4 !text-sm mt-4"
            >
              <MessageCircle size={18} />
              Place Order via WhatsApp
            </button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card-hover p-6 rounded-2xl sticky top-28">
              <h2 className="font-display text-xl font-semibold mb-5">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-semibold truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground font-body">
                        Size: {item.size} · Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-display font-semibold text-gradient-gold">
                        {(item.product.priceNum * item.quantity).toLocaleString()} PKR
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-px bg-border/50 mb-4" />
              <div className="flex justify-between font-body">
                <span className="text-muted-foreground text-sm">Total</span>
                <span className="font-display text-xl font-semibold text-gradient-gold">
                  {totalPrice.toLocaleString()} PKR
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
