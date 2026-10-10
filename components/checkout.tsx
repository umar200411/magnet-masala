"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "@/components/store-link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useCart, CartLines } from "./store";
import { getSelectedVariant, products, priceLabel } from "@/lib/catalog";
import { cartTotal } from "@/lib/cart";
import { site, whatsappReady } from "@/lib/config";
import { orderMessage, whatsappUrl } from "@/lib/whatsapp";
import type { Customer } from "@/lib/whatsapp";
import { WhatsAppLink } from "./whatsapp-link";

type CheckoutStep = "basket" | "delivery" | "whatsapp";
const steps: { id: CheckoutStep; label: string; href: string }[] = [
  { id: "basket", label: "Basket", href: "/cart" },
  { id: "delivery", label: "Delivery details", href: "/checkout" },
  { id: "whatsapp", label: "WhatsApp confirmation", href: "/checkout" },
];

export function CheckoutProgress({ current }: { current: CheckoutStep }) {
  const currentIndex = steps.findIndex(step => step.id === current);
  return <nav className="checkout-steps" aria-label="Checkout progress">
    {steps.map((step, index) => <span key={step.id} className={index === currentIndex ? "active" : index < currentIndex ? "complete" : "upcoming"} aria-current={index === currentIndex ? "step" : undefined}>
      <b>{index < currentIndex ? <Check size={14} aria-hidden="true" /> : index + 1}</b>
      {index < currentIndex ? <Link href={step.href}>{step.label}</Link> : <span>{step.label}</span>}
    </span>)}
  </nav>;
}

export function Summary() {
  const { items } = useCart();
  return <>
    <h2>Order summary</h2>
    {items.map(item => {
      const product = products.find(candidate => candidate.id === item.id)!;
      const variant = getSelectedVariant(product, item.variantId);
      return <div className="summary-line" key={`${item.id}::${item.variantId}`}>
        <span>{product.name}<small>{variant.weight} × {item.quantity}</small></span>
        <span>{priceLabel(variant.salePrice * item.quantity)}</span>
      </div>;
    })}
    <div className="summary-total"><span>Subtotal</span><strong>{priceLabel(cartTotal(items))}</strong></div>
    <p className="muted">{site.deliveryNote}</p>
    <p className="muted">Product availability, final prices and delivery details will be confirmed before you agree to your order.</p>
  </>;
}

export function CartPage() {
  const { items, clear, ready } = useCart();
  if (!items.length) return ready ? <CartLines /> : <p>Loading your basket…</p>;
  return <>
    <CheckoutProgress current="basket" />
    <div className="checkout-grid">
      <section><CartLines /><button className="text-link" onClick={clear}>Clear basket</button><p><Link href="/shop" className="text-link">Continue shopping</Link></p></section>
      <aside className="order-summary"><Summary /><Link className="button" href="/checkout">Continue to checkout <ArrowRight size={18} /></Link></aside>
    </div>
  </>;
}

const fields: [keyof Customer, string, string, string][] = [
  ["name", "Full name", "text", "name"],
  ["phone", "Phone number", "tel", "tel"],
  ["city", "City", "text", "address-level2"],
  ["address", "Complete delivery address", "text", "street-address"],
  ["note", "Order note (optional)", "text", "off"],
];

export function Checkout() {
  const { items, ready, clear } = useCart();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>({ name: "", phone: "", city: "", address: "", note: "" });
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const previousReview = useRef(review);

  useEffect(() => {
    if (previousReview.current !== review) {
      stepHeading.current?.focus();
      previousReview.current = review;
    }
  }, [review]);

  if (!ready) return <p>Loading your basket…</p>;
  if (!items.length) return <CartLines />;

  const message = orderMessage(items, customer);
  const url = whatsappUrl(site.whatsapp, message);
  const submitDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customer.name.trim() || !customer.city.trim() || !customer.address.trim()) {
      setError("Please enter your name, city and full delivery address.");
      return;
    }
    if (!/^[+\d\s()-]{7,22}$/.test(customer.phone) || customer.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number, including your area or country code.");
      return;
    }
    setError("");
    setReview(true);
  };
  const copyOrderSummary = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Copy is unavailable. Select the text in the message preview above.");
    }
  };

  return <>
    <CheckoutProgress current={review ? "whatsapp" : "delivery"} />
    <div className="checkout-grid">
      <section className="checkout-stage" key={review ? "review" : "details"}>
        {!review ? <form onSubmit={submitDetails}>
          <h2 ref={stepHeading} tabIndex={-1}>Where’s it going?</h2>
          <p className="muted">A few details, and you’re ready to continue.</p>
          <div className="form-grid">{fields.map(([key, label, type, auto]) => {
            const invalid = Boolean(error) && key !== "note" && (key === "phone"
              ? !/^[+\d\s()-]{7,22}$/.test(customer.phone) || customer.phone.replace(/\D/g, "").length < 7
              : !customer[key].trim());
            return <label className={key === "address" || key === "note" ? "full" : ""} key={key}>
            {label}
            {key === "address" || key === "note"
              ? <textarea name={key} aria-invalid={invalid} aria-describedby={invalid ? "checkout-error" : undefined} value={customer[key]} required={key !== "note"} maxLength={key === "note" ? 1000 : 600} autoComplete={auto} rows={3} onChange={event => setCustomer(previous => ({ ...previous, [key]: event.target.value }))} />
              : <input name={key} aria-invalid={invalid} aria-describedby={invalid ? "checkout-error" : undefined} type={type} required autoComplete={auto} maxLength={key === "phone" ? 22 : 100} value={customer[key]} onChange={event => setCustomer(previous => ({ ...previous, [key]: event.target.value }))} />}
          </label>; })}</div>
          {error && <p id="checkout-error" role="alert" className="error">{error}</p>}
          <p className="muted">Your details are used to prepare your WhatsApp message. <Link className="text-link" href="/privacy">Privacy information</Link></p>
          <button className="button" type="submit">Review your order <ArrowRight size={18} /></button>
        </form> : <div className="review">
          <p className="eyebrow red">ONE LAST LOOK</p>
          <h2 ref={stepHeading} tabIndex={-1}>Ready to say hello?</h2>
          <p>Check your details before continuing to WhatsApp.</p>
          <dl>{fields.filter(([key]) => customer[key]).map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{customer[key]}</dd></div>)}</dl>
          <button className="text-link" onClick={() => setReview(false)}>Edit delivery details</button>
          <details><summary>Preview WhatsApp message</summary><pre>{message}</pre></details>
          <button className="button outline copy-order-button" type="button" onClick={copyOrderSummary}>{copied ? <><Check size={18} /> Order summary copied</> : "Copy order summary"}</button>
          {whatsappReady && url ? <>
            <p className="checkout-whatsapp-note">Your order request will open in WhatsApp. Magnet Masala will confirm stock, delivery details and the final total there.</p>
            <WhatsAppLink href={url}><MessageCircle size={20} />Send Order on WhatsApp</WhatsAppLink>
            <p className="muted">After sending, return here and tap below to clear your basket and go home. Your order is confirmed only when Magnet Masala confirms it in chat.</p>
            <button className="button return-home-button" type="button" onClick={() => { clear(); router.replace("/"); }}>I’ve sent my order — return home</button>
          </> : <div className="config-notice">
            <p>WhatsApp ordering is not available yet. You can copy your order details while the store’s contact information is being updated.</p>
            <button className="button" onClick={copyOrderSummary}>{copied ? <><Check size={18} /> Order details copied</> : "Copy order details"}</button>
            {error && <p role="alert">{error}</p>}
          </div>}
        </div>}
      </section>
      <aside className="order-summary"><Summary /><Link className="text-link" href="/cart">Edit basket</Link></aside>
    </div>
  </>;
}
