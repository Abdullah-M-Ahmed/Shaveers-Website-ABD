import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { buildOrderMessage, openWhatsApp } from "@/lib/whatsapp";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    openWhatsApp(buildOrderMessage(items, totalPrice));
    onClose();
  };


  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background border-border/50">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="font-body text-sm">Your cart is empty</p>
            <button onClick={onClose} className="btn-primary-green !text-xs !px-6 !py-2">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 rounded-xl bg-secondary/30 border border-border/30"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground font-body">Size: {item.size}</p>
                    <p className="text-sm font-display font-semibold text-gradient-gold mt-1">
                      {item.product.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-body font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="ml-auto text-destructive/60 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-3">
              <div className="flex justify-between font-body">
                <span className="text-muted-foreground text-sm">Subtotal</span>
                <span className="font-display font-semibold">{totalPrice.toLocaleString()} PKR</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn-primary-green w-full text-center"
              >
                Checkout on WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors font-body py-2"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
