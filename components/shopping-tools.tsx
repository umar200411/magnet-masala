"use client";
import { useEffect, useState } from "react";
import Link from "@/components/store-link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "./store";
import { priceLabel } from "@/lib/catalog";
import { cartTotal } from "@/lib/cart";

export function ShoppingTools() {
  const { items, ready } = useCart();
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const showBar = ready && items.length > 0 && pathname !== "/checkout" && pathname !== "/cart" && !pathname.startsWith("/products/");
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartTotal(items);
  return <div className={showBar ? "shopping-tools has-mobile-basket" : "shopping-tools"}>
    {showBar && <><div className="mobile-basket-spacer" /><div className="mobile-basket-bar" aria-label="Basket summary"><span className="mobile-basket-total"><ShoppingBag size={20} /><span>{count} {count === 1 ? "item" : "items"}<strong>{priceLabel(total)}</strong></span></span><Link className="button" href="/cart">View Basket <ArrowRight size={16} /></Link></div></>}
    {scrolled && <button className="back-to-top" aria-label="Back to top" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); document.querySelector<HTMLElement>(".skip")?.focus({ preventScroll: true }); }}><ArrowUp size={20} /></button>}
  </div>;
}
