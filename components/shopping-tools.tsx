"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "./store";
import { products } from "@/lib/catalog";

export function ShoppingTools() {
  const { items, ready, setOpen } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const showBar = ready && items.length > 0 && pathname !== "/checkout" && pathname !== "/cart";
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (products.find(p => p.id === item.id)?.price ?? 0) * item.quantity, 0);
  const priced = items.every(item => products.find(p => p.id === item.id)?.price != null);
  return <div className={showBar ? "shopping-tools has-mobile-basket" : "shopping-tools"}>
    {showBar && <><div className="mobile-basket-spacer" /><div className="mobile-basket-bar" aria-label="Basket summary"><button onClick={() => setOpen(true)}><ShoppingBag size={20} /><span>{count} {count === 1 ? "item" : "items"}<strong>{priced ? `Rs. ${total.toLocaleString("en-PK")}` : "Price on request"}</strong></span></button><Link className="button" href="/checkout">Checkout <ArrowRight size={16} /></Link></div></>}
    {scrolled && <button className="back-to-top" aria-label="Back to top" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); document.querySelector<HTMLElement>(".skip")?.focus({ preventScroll: true }); }}><ArrowUp size={20} /></button>}
  </div>;
}
