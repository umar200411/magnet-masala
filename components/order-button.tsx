import { MessageCircle } from "lucide-react";
import { site } from "@/lib/config";
import { products, getSelectedVariant } from "@/lib/catalog";
import { orderMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppLink } from "./whatsapp-link";

export function OrderButton({ id, variantId, quantity = 1, compact = false }: { id: string; variantId: string; quantity?: number; compact?: boolean }) {
  const product = products.find(item => item.id === id)!;
  const variant = getSelectedVariant(product, variantId);
  if (!variant.inStock) return <p className="muted">This pack is currently out of stock.</p>;
  const url = whatsappUrl(site.whatsapp, orderMessage([{ id, variantId, quantity }]));
  if (!url) return <p className="muted">WhatsApp ordering is temporarily unavailable.</p>;
  return <WhatsAppLink className={`button whatsapp${compact ? " card-order" : ""}`} href={url}><MessageCircle size={18} aria-hidden="true" />Continue to WhatsApp</WhatsAppLink>;
}
