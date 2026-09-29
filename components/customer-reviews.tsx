"use client";
import { useState } from "react";
import { Camera, MessageCircle, Star, ArrowUpRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { site } from "@/lib/config";
import { whatsappUrl } from "@/lib/whatsapp";

export function CustomerReviews() {
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [product, setProduct] = useState(products[0].name);
  const [review, setReview] = useState("");
  const [consent, setConsent] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const message = `Magnet Masala customer review\nName: ${name.trim()}\nProduct: ${product}\nRating: ${rating ? `${rating}/5` : "Choose a rating"}\nReview: ${review.trim()}\nPermission to publish my first name, rating and review on the website: ${consent ? "Yes" : "No — private feedback only"}`;
  const url = whatsappUrl(site.whatsapp, message);
  return <section id="reviews" className="review-section" aria-labelledby="reviews-heading"><div className="wrap review-layout">
    <div className="review-intro"><p className="mm-kicker"><MessageCircle size={15} /> From your kitchen</p><h2 id="reviews-heading">Made a meal?<br /><em>Tell us about it.</em></h2><p>Your biryani night. Your first BBQ. Your everyday favourite. We’d love to hear how it turned out.</p><div className="review-empty"><span className="review-camera"><Camera size={25} /></span><div><h3>Your dish could be first.</h3><p>No customer reviews published yet. Share an honest review and, if you like, a photo of what you cooked.</p></div></div><p className="review-photo-note">You can attach a photo in WhatsApp after opening your message. We’ll ask for your permission before featuring it.</p></div>
    <form className="review-form" onChange={() => setPrepared(false)} onSubmit={event => { event.preventDefault(); setPrepared(true); }}><h3>How was the flavour?</h3><p className="muted">Send your feedback directly to Magnet Masala.</p>
      <fieldset className="rating-picker"><legend>Your rating</legend>{[1,2,3,4,5].map(value => <label key={value} className={Number(rating) >= value ? "rating-selected" : ""}><input type="radio" required name="rating" value={value} checked={rating === String(value)} onChange={event => setRating(event.target.value)} /><Star size={23} aria-hidden="true" /><span className="sr-only">{value} {value === 1 ? "star" : "stars"}</span></label>)}<span aria-hidden="true">{rating ? `${rating}/5` : "Choose a rating"}</span></fieldset>
      <div className="review-fields"><label>First name<input required autoComplete="given-name" maxLength={60} value={name} onChange={event => setName(event.target.value)} /></label><label>What did you try?<select value={product} onChange={event => setProduct(event.target.value)}>{products.map(item => <option key={item.id}>{item.name}</option>)}</select></label></div>
      <label>Your review<textarea required minLength={10} maxLength={1500} rows={4} placeholder="Tell us what you cooked and what you thought…" value={review} onChange={event => setReview(event.target.value)} /></label>
      <label className="review-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>You may publish my first name, rating and review on this website.</span></label>
      <button className="button" type="submit">Prepare my review <ArrowUpRight size={18} /></button>
      {prepared && <div className="review-handoff" role="status"><p>Your message is ready. Open WhatsApp and press Send to share it. It won’t appear on the website automatically.</p>{url ? <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">Continue to WhatsApp <ArrowUpRight size={16} /></a> : <a className="text-link" href={`mailto:${site.email}?subject=Customer%20review&body=${encodeURIComponent(message)}`}>Send by email</a>}</div>}
    </form>
  </div></section>;
}
