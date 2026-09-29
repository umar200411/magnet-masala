import { MessageCircle } from "lucide-react";
import { site } from "@/lib/config";
import { orderMessage, whatsappUrl } from "@/lib/whatsapp";

export function OrderButton({ id, quantity = 1, compact = false }: { id: string; quantity?: number; compact?: boolean }) {
  const url = whatsappUrl(site.whatsapp, orderMessage([{ id, quantity }]));
  if (!url) return <p className="muted">WhatsApp ordering is temporarily unavailable.</p>;
  return <a className={`button outline${compact ? " card-order" : ""}`} href={url} target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp (opens in a new tab)"><MessageCircle size={18} aria-hidden="true" />Order on WhatsApp</a>;
}
