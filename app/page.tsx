import { Bundles } from "@/components/bundles";
import Link from "@/components/store-link";
import { ArrowRight, Sparkles, Flame, Leaf, ChefHat, MessageCircle, PackageCheck, ShoppingBasket } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { HomepageMotion } from "@/components/homepage-motion";
import { ProductImage } from "@/components/product-image";

export const metadata = { alternates: { canonical: "/" } };

const cookingLinks = [
  { name: "Biryani Night", note: "Rice dishes and weekend favourites", href: "/shop?search=biryani", icon: ChefHat, tone: "sun" },
  { name: "BBQ & Grill", note: "Tikka, seekh kabab and bold blends", href: "/shop?search=BBQ", icon: Flame, tone: "lime" },
  { name: "Everyday Cooking", note: "Kitchen staples for daily recipes", href: "/shop?category=Everyday%20Spices", icon: Leaf, tone: "coral" },
  { name: "Snacks & Fries", note: "Quick seasonings for snack time", href: "/shop?search=snacks", icon: Sparkles, tone: "sun" },
  { name: "Seafood", note: "Find the fish spice blend", href: "/shop?search=seafood", icon: Flame, tone: "coral" },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const snacks = products.filter((p) => p.category === "Quick Seasonings");

  return (
    <main id="main" className="bright-home">
      <section className="mm-hero">
        <div className="mm-hero-bg mm-blob-one" aria-hidden="true" />
        <div className="mm-hero-bg mm-blob-two" aria-hidden="true" />
        <div className="wrap mm-hero-grid">
          <div className="mm-hero-copy reveal-up">
            <div className="mm-kicker"><Sparkles size={15}/> Made for loud, happy food</div>
            <h1>Turn up the <span>flavour.</span></h1>
            <div className="mm-hero-offer">
              <strong className="mm-hero-offer-value">20% OFF</strong>
              <span className="mm-hero-offer-label">Limited Offer</span>
            </div>
            <p className="mm-lead">Recipe blends, everyday spices and snack seasonings for the dishes your table already loves.</p>
            <div className="mm-actions">
              <Link className="mm-button mm-button-dark" href="/shop">Explore the range <ArrowRight size={18}/></Link>
              <Link className="mm-round-link" href="#featured" aria-label="Jump to featured products"><ArrowRight size={21}/></Link>
            </div>
            <div className="hero-shortcuts"><Link href="#bundles">Shop curated sets <ArrowRight size={15}/></Link></div>
            <div className="mm-proof"><MessageCircle size={17}/><span>Build your basket here, finish your order on WhatsApp.</span></div>
          </div>

          <div className="mm-hero-stage reveal-scale">
            <span className="mm-stage-copy" aria-hidden="true">BIG TASTE<br/>STARTS HERE</span>
            <div className="mm-ring mm-ring-a" aria-hidden="true" />
            <div className="mm-ring mm-ring-b" aria-hidden="true" />
            <div className="mm-product mm-product-left"><ProductImage src="/products/chicken-tikka-masala.jpg" alt="Magnet Chicken Tikka Masala" fill priority sizes="(max-width:700px) 43vw, (max-width:1000px) 22vw, (max-width:1490px) 20vw, 275px" /></div>
            <div className="mm-product mm-product-right"><ProductImage src="/products/seekh-kabab-masala.jpg" alt="Magnet Seekh Kabab Masala" fill priority sizes="(max-width:700px) 43vw, (max-width:1000px) 22vw, (max-width:1490px) 20vw, 275px" /></div>
            <div className="mm-product mm-product-main"><ProductImage src="/products/biryani-masala.jpg" alt="Magnet Biryani Masala" fill priority sizes="(max-width:700px) 58vw, (max-width:1000px) 28vw, (max-width:1490px) 24vw, 345px" /></div>
            <div className="mm-burst">100%<br/><b>FULL-ON</b><br/>FLAVOUR</div>
            <div className="mm-burst mm-burst-offer">
              <strong>20% OFF</strong>
              <span>LIMITED OFFER</span>
            </div>
            <span className="mm-float-chip chip-one">Biryani night</span>
            <span className="mm-float-chip chip-two">BBQ plans</span>
          </div>
        </div>
      </section>

      <section className="mm-trust-strip wrap" aria-label="Shopping information">
        <div><PackageCheck size={18} aria-hidden="true"/><span>125g and 250g packs where available</span></div>
        <div><ShoppingBasket size={18} aria-hidden="true"/><span>Review your basket before ordering</span></div>
        <div><MessageCircle size={18} aria-hidden="true"/><span>Order requests continue on WhatsApp</span></div>
        <div><ArrowRight size={18} aria-hidden="true"/><span>Delivery details confirmed in chat</span></div>
      </section>

      <div className="mm-marquee" aria-hidden="true">
        <div className="mm-marquee-track">
          {Array.from({length: 2}).map((_, i) => (
            <div className="mm-marquee-set" key={i}>
              <span>RECIPE BLENDS</span><b>✦</b><span>EVERYDAY SPICES</span><b>✦</b><span>QUICK SEASONINGS</span><b>✦</b><span>BIG FLAVOUR ENERGY</span><b>✦</b>
            </div>
          ))}
        </div>
      </div>

      <section id="categories" data-reveal className="wrap mm-section mm-category-section">
        <div className="mm-section-intro">
          <p className="mm-kicker"><Sparkles size={14}/> Shop by occasion</p>
          <h2>What are we cooking?</h2>
        </div>
        <div className="mm-category-grid">
          {cookingLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} className={`mm-category-card ${item.tone}`} href={item.href}>
                <div className="mm-category-icon"><Icon size={28}/></div>
                <div><span>0{i + 1}</span><h3>{item.name}</h3><p>{item.note}</p></div>
                <ArrowRight className="mm-card-arrow" size={22}/>
              </Link>
            );
          })}
        </div>
      </section>

      <section data-reveal className="mm-feature-band" id="featured">
        <div className="wrap mm-section">
          <div className="mm-section-heading">
            <div><p className="mm-kicker"><Flame size={14}/> Featured blends</p><h2>Start with the <em>good stuff.</em></h2></div>
            <Link href="/shop?category=Recipe%20Blends" className="mm-text-link">See all recipe blends <ArrowRight size={17}/></Link>
          </div>
          <div className="product-grid mm-product-grid">{featured.map((p)=><ProductCard key={p.id} product={p}/>)}</div>
        </div>
      </section>

      <Bundles />

      <section data-reveal className="wrap mm-editorial">
        <div className="mm-editorial-copy">
          <p className="mm-kicker"><Leaf size={14}/> Everyday essentials</p>
          <h2>Your shelf should look <em>this alive.</em></h2>
          <p>Keep the basics close and the possibilities wide open—cumin, coriander, turmeric, ginger, garlic and pepper for whatever you cook next.</p>
          <Link className="mm-button mm-button-yellow" href="/shop?category=Everyday%20Spices">Shop everyday spices <ArrowRight size={18}/></Link>
          <div className="mm-word-stack"><span>CUMIN</span><span>CORIANDER</span><span>TURMERIC</span></div>
        </div>
        <div className="mm-editorial-visual">
          <div className="mm-sun" />
          <div className="mm-editorial-product"><ProductImage src="/products/turmeric-powder.jpg" alt="Magnet Masala Turmeric Powder" fill sizes="(max-width:700px) 70vw, 35vw"/></div>
          <span className="mm-orbit orbit-one">golden</span><span className="mm-orbit orbit-two">earthy</span><span className="mm-orbit orbit-three">everyday</span>
        </div>
      </section>

      <section data-reveal className="wrap mm-section mm-snack-section">
        <div className="mm-section-heading">
          <div><p className="mm-kicker"><Sparkles size={14}/> Fast flavour</p><h2>Snack time, but <em>better.</em></h2></div>
          <Link className="mm-text-link" href="/shop?category=Quick%20Seasonings">See quick seasonings <ArrowRight size={17}/></Link>
        </div>
        <div className="snack-grid mm-product-grid">{snacks.map((p)=><ProductCard key={p.id} product={p}/>)}</div>
      </section>

      <section data-reveal className="wrap mm-ordering">
        <div className="mm-order-intro"><p className="mm-kicker"><MessageCircle size={14}/> Easy ordering</p><h2>Pick. Basket. <em>WhatsApp.</em></h2><p>Your favourite masalas are only a few taps away.</p></div>
        <div className="mm-steps">
          {[['01','Pick your favourites','Browse the range and add what you need.'],['02','Review your basket','Check quantities and delivery details.'],['03','Continue on WhatsApp','Send the prepared message and confirm your order.']].map(([n,t,d])=><div className="mm-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>
      <HomepageMotion />
    </main>
  );
}
