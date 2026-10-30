import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { buildOrderMessage, openWhatsApp } from "@/lib/whatsapp";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
          <button onClick={() => navigate("/")} className="btn-primary-green">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast({ title: `${product.name} added to cart` });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    const message = buildOrderMessage(
      [{ product, size: selectedSize, quantity }],
      product.priceNum * quantity
    );
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysGold />
      <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden bg-secondary/30 aspect-[3/4] mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-accent glow-gold"
                      : "border-border/30 hover:border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
              Shaveers Collection
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-3">
              {product.name}
            </h1>
            <p className="font-body text-muted-foreground mb-6">{product.description}</p>

            <div className="font-display text-3xl font-semibold text-gradient-gold mb-8">
              {product.price}
            </div>

            {/* Fabric Details */}
            <div className="mb-8">
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-2 font-semibold">
                Fabric & Details
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {product.fabric}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-border/50 mb-8" />

            {/* Size Selector */}
            <div className="mb-8">
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-3 font-semibold">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {(product.sizes || ["S", "M", "L", "XL", "XXL"]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground glow-green"
                        : "border border-border hover:border-accent text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-foreground mb-3 font-semibold">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-display text-xl font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="btn-primary-green flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-outline-gold flex-1 flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
