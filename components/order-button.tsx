"use client";

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { products, getSelectedVariant } from "@/lib/catalog";
import { useCart } from "./store";

export function OrderButton({ id, variantId, quantity = 1, compact = false }: { id: string; variantId: string; quantity?: number; compact?: boolean }) {
  const { add, ready, setOpen } = useCart();
  const router = useRouter();
  const product = products.find(item => item.id === id)!;
  const variant = getSelectedVariant(product, variantId);
  if (!variant.inStock) return <p className="muted">This pack is currently out of stock.</p>;
  return <button type="button" disabled={!ready} className={`button whatsapp${compact ? " card-order" : ""}`} onClick={() => {
    add(id, variant.id, quantity, false);
    setOpen(false);
    router.push("/checkout");
  }}><MessageCircle size={18} aria-hidden="true" />Continue to WhatsApp</button>;
}
