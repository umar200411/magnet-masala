"use client";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/store-link";
import { ArrowRight, Check, Package, Plus } from "lucide-react";
import { bundles, bundleProducts, bundleTotal } from "@/lib/bundles";
import { getSelectedVariant } from "@/lib/catalog";
import { ProductImage } from "./product-image";
import { useCart } from "./store";

function BundleCard({ bundle }: { bundle: typeof bundles[number] }) {
  const { add, items, ready, notifyAdded } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const selected = bundleProducts(bundle.ids);
  const total = bundleTotal(bundle.ids);
  const packSummary = selected.every(product => getSelectedVariant(product).weight === getSelectedVariant(selected[0]).weight)
    ? `${selected.length} × ${getSelectedVariant(selected[0]).weight} jars`
    : `${selected.length} selected jars`;
  const atLimit = bundle.ids.some(id => (items.find(item => item.id === id && item.variantId === getSelectedVariant(bundleProducts([id])[0]).id)?.quantity ?? 0) >= 99);
  return <article className={`bundle-card bundle-${bundle.tone}`}>
    <div className="bundle-art"><span className="bundle-count">{packSummary}</span><div className="bundle-jars">{selected.map(product => <Link key={product.id} href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ProductImage src={product.image} alt={product.name} fill sizes="(max-width:700px) 28vw, 12vw" style={{ objectFit: "contain" }} /></Link>)}</div></div>
    <div className="bundle-copy"><p className="eyebrow">{bundle.occasion}</p><h3>{bundle.name}</h3><p>{bundle.description}</p><p className="bundle-includes-label">Includes:</p><ul>{selected.map(product => <li key={product.id}><Check size={14} aria-hidden="true" /><Link href={`/products/${product.slug}`}>{product.name} <span>{getSelectedVariant(product).weight}</span></Link></li>)}</ul>
      <div className="bundle-price"><span>Estimated total<strong>{total === null ? "Ask for price" : `Rs. ${total.toLocaleString("en-PK")}`}</strong></span><span>{selected.length} individual jars</span></div>
      <button className={`button${added ? " just-added" : ""}`} disabled={!ready || atLimit || selected.some(p => !getSelectedVariant(p).inStock)} onClick={() => { bundle.ids.forEach(id => add(id, undefined, 1, false)); notifyAdded(`${bundle.name} added to basket`); setAdded(true); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setAdded(false), 1800); }}>{added ? <Check size={18} /> : <Plus size={18} />}<span role="status">{added ? "Set added to basket" : atLimit ? "Basket quantity limit reached" : selected.some(p => !getSelectedVariant(p).inStock) ? "Currently unavailable" : "Add Bundle to Basket"}</span></button>
    </div>
  </article>;
}

export function Bundles() {
  return <section id="bundles" className="wrap mm-section bundle-section" aria-labelledby="bundle-heading"><div className="mm-section-heading"><div><p className="mm-kicker"><Package size={15} /> Better together</p><h2 id="bundle-heading">One plan.<br /><em>All the flavour.</em></h2></div><p className="section-note">Choose a ready-made combination.<br />One tap adds one jar of each to your basket.</p></div><div className="bundle-grid">{bundles.map(bundle => <BundleCard key={bundle.id} bundle={bundle} />)}</div><div className="bundle-footnote"><p>Estimates use current listed product prices. Final prices and delivery are confirmed on WhatsApp; no bundle discount is included.</p><Link href="/shop" className="text-link">Build your own mix <ArrowRight size={16} /></Link></div></section>;
}
