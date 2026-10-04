"use client";
import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "@/components/store-link";
import { usePathname } from "next/navigation";
import { Check, ShoppingBag, Search, Menu, Plus, Minus, ArrowRight, Trash2, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getSelectedVariant, products, categories, priceLabel, variantImage } from "@/lib/catalog";
import { site, whatsappReady } from "@/lib/config";
import { ProductPrice } from "./product-price";
import { ProductImage } from "./product-image";
import { ThemeToggle } from "./theme";
import { cartItemKey, cartTotal } from "@/lib/cart";
import { CartContext, type CartItem } from "./cart-context";

export type { CartItem } from "./cart-context";
export function useCart() { return useContext(CartContext)!; }

function flyProductToCart(productId: string, variantId: string) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const source = document.activeElement?.closest(".product-card")?.querySelector<HTMLImageElement>(".product-media img")
    ?? document.querySelector<HTMLImageElement>(".detail-media img");
  const target = document.querySelector<HTMLElement>('header button[aria-label="Open cart"]');
  if (!source || !target) return;
  const from = source.getBoundingClientRect(), to = target.getBoundingClientRect();
  const thumb = document.createElement("img");
  const product = products.find(item => item.id === productId);
  const variant = product && getSelectedVariant(product, variantId);
  thumb.src = source.currentSrc || source.src || (product && variantImage(product, variant!)) || "";
  Object.assign(thumb.style, { position: "fixed", zIndex: "9999", pointerEvents: "none", left: `${from.left + from.width / 2 - 28}px`, top: `${from.top + from.height / 2 - 28}px`, width: "56px", height: "56px", padding: "4px", borderRadius: "10px", objectFit: "contain", background: "#fff8ef", boxShadow: "0 8px 24px #0005" });
  document.body.appendChild(thumb);
  const animation = thumb.animate([
    { transform: "translate(0, 0) scale(1)", opacity: 1 },
    { transform: `translate(${to.left + to.width / 2 - from.left - from.width / 2}px, ${to.top + to.height / 2 - from.top - from.height / 2}px) scale(.16)`, opacity: .35 },
  ], { duration: 520, easing: "cubic-bezier(.2,.75,.25,1)" });
  animation.onfinish = () => thumb.remove();
  animation.oncancel = () => thumb.remove();
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]), [ready, setReady] = useState(false), [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifyAdded = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3600);
  };
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const raw: unknown = JSON.parse(localStorage.getItem("magnet-cart") || "[]");
        if (Array.isArray(raw)) {
          const merged = new Map<string, CartItem>();
          for (const entry of raw) {
            if (!entry || typeof entry !== "object") continue;
            const candidate = entry as { id?: unknown; variantId?: unknown; quantity?: unknown };
            const product = products.find(p => p.id === candidate.id);
            if (!product || !Number.isInteger(candidate.quantity) || Number(candidate.quantity) < 1) continue;
            const variant = getSelectedVariant(product, typeof candidate.variantId === "string" ? candidate.variantId : undefined);
            if (!variant.inStock) continue;
            const normalized = { id: product.id, variantId: variant.id, quantity: Math.min(99, Number(candidate.quantity)) };
            const key = cartItemKey(normalized), previous = merged.get(key);
            merged.set(key, { ...normalized, quantity: Math.min(99, normalized.quantity + (previous?.quantity ?? 0)) });
          }
          setItems([...merged.values()]);
        }
      } catch { /* Invalid legacy storage is replaced by the next write. */ }
      setReady(true);
    });
    return () => { active = false; };
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem("magnet-cart", JSON.stringify(items)); } catch { /* Storage may be unavailable. */ } }, [items, ready]);
  const add = (id: string, variantId?: string, q = 1, show = true) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const variant = getSelectedVariant(product, variantId);
    if (!variant.inStock) return;
    const qty = Math.max(1, Math.min(99, Math.floor(q) || 1));
    const key = `${id}::${variant.id}`;
    setItems(old => old.some(i => cartItemKey(i) === key) ? old.map(i => cartItemKey(i) === key ? { ...i, quantity: Math.min(99, i.quantity + qty) } : i) : [...old, { id, variantId: variant.id, quantity: qty }]);
    if (show) setOpen(true);
  };
  const update = (id: string, variantId: string, q: number) => setItems(old => q < 1 ? old.filter(i => i.id !== id || i.variantId !== variantId) : old.map(i => i.id === id && i.variantId === variantId ? { ...i, quantity: Math.min(99, Math.floor(q) || 1) } : i));
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  return <CartContext.Provider value={{ items, ready, add, update, clear: () => setItems([]), setOpen, notifyAdded }}>
    {children}
    {toast && <div className="basket-toast" role="status" aria-live="polite"><Check size={18} aria-hidden="true" /><span>{toast}</span><Link href="/cart" onClick={() => setToast("")}>View basket</Link><button type="button" aria-label="Dismiss basket notification" onClick={() => setToast("")}>×</button></div>}
    <Sheet open={open} onOpenChange={setOpen}><SheetContent className="cart-sheet"><SheetTitle>Your basket</SheetTitle><SheetDescription>Good food starts here.</SheetDescription><div className="drawer-items"><CartLines /></div>{items.length > 0 && <><CartRecommendations /><div className="basket-grand-total"><span>Basket total</span><strong>{priceLabel(cartTotal(items))}</strong></div><p>{site.deliveryNote}</p><Link className="button" href="/checkout" onClick={() => setOpen(false)}>Continue to checkout <ArrowRight size={18} /></Link><Link className="text-link" href="/cart" onClick={() => setOpen(false)}>View full basket</Link></>}<button className="text-link" onClick={() => setOpen(false)}>Continue shopping</button></SheetContent></Sheet>
  </CartContext.Provider>;
}

export function AddButton({ id, variantId, compact = false, quantity = 1 }: { id: string; variantId: string; compact?: boolean; quantity?: number }) {
  const { add, ready, items, notifyAdded } = useCart();
  const [added, setAdded] = useState(false), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const atLimit = (items.find(item => item.id === id && item.variantId === variantId)?.quantity ?? 0) >= 99;
  const product = products.find(p => p.id === id)!;
  const variant = getSelectedVariant(product, variantId);
  return <button disabled={!ready || atLimit || !variant.inStock} className={`${compact ? "quick-add" : "button"}${added ? " just-added" : ""}`} onClick={() => { flyProductToCart(id, variantId); add(id, variantId, quantity, false); notifyAdded(`${product.name} ${variant.weight} added to basket`); setAdded(true); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setAdded(false), 1600); }} aria-label={!variant.inStock ? `${variant.weight} out of stock` : atLimit ? "Maximum quantity reached" : `Add ${product.name} ${variant.weight} to basket`}>
    {added ? <Check size={18} /> : <Plus size={18} />}<span role="status" aria-live="polite">{!variant.inStock ? "Out of stock" : added ? "Added!" : atLimit ? "Max 99" : compact ? "Add to Basket" : "Add to basket"}</span>
  </button>;
}

export function Header() {
  const { items, setOpen } = useCart(), [menu, setMenu] = useState(false), [scrolled, setScrolled] = useState(false);
  const pathname = usePathname().replace(/\/$/, "") || "/";
  useEffect(() => { const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <><div className="announcement">{site.announcement}<ArrowRight size={13} /></div><header className={`header wrap${scrolled ? " is-scrolled" : ""}`}><Link href="/" aria-label="Magnet Masala home"><ProductImage src="/logo.jpg" width={78} height={78} alt="Magnet Masala" className="logo" priority /></Link><nav className="desktop-nav"><Link className={pathname === "/shop" || pathname.startsWith("/products/") ? "nav-active" : ""} href="/shop">Shop all</Link><Link className={pathname === "/" ? "nav-active" : ""} href="/#bundles">Bundles</Link><Link className={pathname === "/about" ? "nav-active" : ""} href="/about">Our story</Link><Link className={pathname === "/contact" ? "nav-active" : ""} href="/contact">Contact</Link></nav><div className="header-actions"><ThemeToggle /><Link href="/shop?search=" aria-label="Search products"><Search /></Link><button aria-label="Open cart" onClick={() => setOpen(true)}><ShoppingBag /><span className="badge basket-bounce" key={items.reduce((s, i) => s + i.quantity, 0)} aria-live="polite" aria-atomic="true">{items.reduce((s, i) => s + i.quantity, 0)}</span></button><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenu(true)}><Menu /></button></div></header><Sheet open={menu} onOpenChange={setMenu}><SheetContent><SheetTitle>Magnet Masala</SheetTitle><SheetDescription>Find your next favourite masala.</SheetDescription><nav className="mobile-links">{[["Shop all", "/shop"], ["Biryani night", "/shop?search=biryani"], ["BBQ & grill", "/shop?search=BBQ"], ["Everyday spices", "/shop?category=Everyday%20Spices"], ["Snack seasonings", "/shop?category=Quick%20Seasonings"], ["Seafood", "/shop?search=fish"], ["Bundles", "/#bundles"], ["Our story", "/about"], ["Delivery", "/delivery"], ["FAQ", "/faq"], ["Contact", "/contact"], ["Your basket", "/cart"]].map(([n, h]) => <Link key={h} href={h} onClick={() => setMenu(false)}>{n}</Link>)}</nav><div className="mobile-menu-theme"><span>Appearance</span><ThemeToggle /></div></SheetContent></Sheet></>;
}

export function Quantity({ value, onChange }: { value: number; onChange: (n: number) => void }) { return <div className="quantity"><button aria-label="Decrease quantity" disabled={value <= 1} onClick={() => onChange(value - 1)}><Minus size={16} /></button><output key={value} className="quantity-value" aria-label="Quantity">{value}</output><button aria-label="Increase quantity" disabled={value >= 99} onClick={() => onChange(value + 1)}><Plus size={16} /></button></div>; }

export function CartLines() {
  const { items, update, ready, setOpen } = useCart();
  if (!ready) return <p>Loading your basket…</p>;
  if (!items.length) return <div className="empty"><ShoppingBag size={38} /><h2>Your kitchen needs a little more flavour.</h2><Link href="/shop" className="button" onClick={() => setOpen(false)}>Explore Magnet Masala</Link></div>;
  return <>{items.map(item => { const p = products.find(product => product.id === item.id)!; const variant = getSelectedVariant(p, item.variantId); return <div className="cart-line" key={cartItemKey(item)}><Link href={`/products/${p.slug}`}><ProductImage src={variantImage(p, variant)} fallbackSrc={p.image} width={86} height={110} alt={`${p.name}, ${variant.weight}`} /></Link><div><Link href={`/products/${p.slug}`}><h3>{p.name}</h3></Link><p className="muted">{variant.weight}</p><ProductPrice variant={variant} /><Quantity value={item.quantity} onChange={q => update(item.id, item.variantId, q)} /><p>{priceLabel(variant.salePrice * item.quantity)}</p></div><button className="remove" aria-label={`Remove ${p.name} ${variant.weight}`} onClick={() => update(item.id, item.variantId, 0)}><Trash2 size={18} /></button></div>; })}</>;
}

function CartRecommendations() {
  const { items } = useCart();
  const pairs: Record<string, string[]> = { "biryani-masala": ["garlic-powder", "garam-masala"], "fries-masala": ["cheese-powder", "chaat-masala"], "chicken-tikka-masala": ["chaat-masala", "garam-masala"] };
  const source = items.find(item => pairs[item.id]);
  const suggestions = source ? (pairs[source.id] ?? []).flatMap(id => products.filter(product => product.id === id && !items.some(item => item.id === id))) : [];
  if (!suggestions.length) return null;
  return <section className="cart-recommendations" aria-label="Complete your meal"><h3>Complete your meal</h3>{suggestions.map(product => <div key={product.id}><Link href={`/products/${product.slug}`}>{product.name}</Link><AddButton id={product.id} variantId={product.variants[0].id} compact /></div>)}</section>;
}

export function Footer() {
  return <footer><div className="wrap footer-grid">
    <div><ProductImage src="/logo.jpg" width={104} height={104} alt="Magnet Masala" className="footer-logo" /><p>Everyday spices. Favourite recipes.<br />One kitchen shelf.</p></div>
    <div><h3>Shop</h3><Link href="/shop">All products</Link><Link href="/#bundles">Curated bundles</Link>{categories.map(category => <Link key={category} href={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>)}</div>
    <div><h3>Good to know</h3>{[["About", "/about"], ["Delivery information", "/delivery"], ["FAQ", "/faq"], ["Contact", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
    <div><h3>Let’s talk flavour</h3><p>Questions about your order?<br />We’re happy to help.</p><Link href="/contact" className="footer-contact">Get in touch <ArrowRight size={16} /></Link>{whatsappReady && <a className="footer-whatsapp" href={`https://wa.me/${site.whatsapp}`}><MessageCircle size={16} /> Chat on WhatsApp</a>}{site.email && <a href={`mailto:${site.email}`} style={{ overflowWrap: "anywhere" }}>{site.email}</a>}{site.instagram && <a href={site.instagram}>Instagram</a>}{site.facebook && <a href={site.facebook}>Facebook</a>}</div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Magnet Masala</span><span>Made for the love of food.</span></div></footer>;
}
