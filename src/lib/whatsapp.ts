import type { CartItem } from "@/contexts/CartContext";

export const WHATSAPP_NUMBER = "923290808905";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const buildOrderMessage = (items: CartItem[], total: number) => {
  const lines = items
    .map(
      (item) =>
        `• ${item.product.name} (Size: ${item.size}) x${item.quantity}, ${(
          item.product.priceNum * item.quantity
        ).toLocaleString()} PKR`
    )
    .join("\n");

  return `*New Order, Shaveers*\n\n${lines}\n\n*Total: ${total.toLocaleString()} PKR*\n\nI'd like to place this order.`;
};

export const openWhatsApp = (message?: string) => {
  const url = message
    ? `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
    : WHATSAPP_LINK;
  window.open(url, "_blank", "noopener,noreferrer");
};
