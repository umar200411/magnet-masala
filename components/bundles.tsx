"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Package, Plus } from "lucide-react";
import { bundles, bundleProducts, bundleTotal } from "@/lib/bundles";
import { ProductImage } from "./product-image";
import { useCart } from "./store";

function BundleCard({ bundle }: { bundle: typeof bundles[number] }) {
  const { add, items, ready } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const selected = bundleProducts(bundle.ids);
  const total = bundleTotal(bundle.ids);
  const atLimit = bundle.ids.some(id => (items.find(item => item.id === id)?.quantity ?? 0) >= 99);
  return <article className={`bundle-card bundle-${bundle.tone}`}>
    <div className="bundle-art"><span className="bundle-count">{selected.length} jars · 125 g each</span><div className="bundle-jars">{selected.map(product => <Link key={product.id} href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ProductImage src={product.image} alt={product.name} fill sizes="(max-width:700px) 28vw, 12vw" style={{ objectFit: "contain" }} /></Link>)}</div></div>
    <div className="bundle-copy"><p className="eyebrow">{bundle.occasion}</p><h3>{bundle.name}</h3><p>{bundle.description}</p><ul>{selected.map(product => <li key={product.id}><Check size={14} aria-hidden="true" /><Link href={`/products/${product.slug}`}>{product.name}</Link></li>)}</ul>
      <div className="bundle-price"><span>Estimated total<strong>{total === null ? "Ask for price" : `Rs. ${total.toLocaleString("en-PK")}`}</strong></span><span>{selected.length} individual jars</span></div>
      <button className={`button${added ? " just-added" : ""}`} disabled={!ready || atLimit} onClick={() => { bundle.ids.forEach(id => add(id, 1, false)); setAdded(true); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setAdded(false), 1800); }}>{added ? <Check size={18} /> : <Plus size={18} />}<span role="status">{added ? "Set added to basket" : atLimit ? "Basket quantity limit reached" : `Add ${bundle.name.toLowerCase()}`}</span></button>
    </div>
  </article>;
}

export function Bundles() {
  return <section id="bundles" className="wrap mm-section bundle-section" aria-labelledby="bundle-heading"><div className="mm-section-heading"><div><p className="mm-kicker"><Package size={15} /> Better together</p><h2 id="bundle-heading">One plan.<br /><em>All the flavour.</em></h2></div><p className="section-note">Choose a ready-made combination.<br />One tap adds one jar of each to your basket.</p></div><div className="bundle-grid">{bundles.map(bundle => <BundleCard key={bundle.id} bundle={bundle} />)}</div><div className="bundle-footnote"><p>Estimates use current listed product prices. Final prices and delivery are confirmed on WhatsApp; no bundle discount is included.</p><Link href="/shop" className="text-link">Build your own mix <ArrowRight size={16} /></Link></div></section>;
}
