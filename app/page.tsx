import { Bundles } from "@/components/bundles";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Flame, Leaf, ChefHat, MessageCircle } from "lucide-react";
import { products, categories } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

const categoryMeta = [
  { icon: ChefHat, note: "Classic favourites, made easier", tone: "sun" },
  { icon: Leaf, note: "Bright everyday kitchen essentials", tone: "lime" },
  { icon: Flame, note: "Fast flavour for snack attacks", tone: "coral" },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const snacks = products.filter((p) => p.category === "Quick Seasonings");

  return (
    <main id="main" className="bright-home">
      <section className="mm-hero">
        <div className="mm-hero-bg mm-blob-one" />
        <div className="mm-hero-bg mm-blob-two" />
        <div className="wrap mm-hero-grid">
          <div className="mm-hero-copy reveal-up">
            <div className="mm-kicker"><Sparkles size={15}/> Made for loud, happy food</div>
            <h1>Turn up the <span>flavour.</span></h1>
            <p className="mm-lead">Recipe blends, everyday spices and snack seasonings for the dishes your table already loves.</p>
            <div className="mm-actions">
              <Link className="mm-button mm-button-dark" href="/shop">Explore the range <ArrowRight size={18}/></Link>
              <Link className="mm-round-link" href="#featured" aria-label="Jump to featured products"><ArrowRight size={21}/></Link>
            </div>
            <div className="hero-shortcuts"><Link href="#bundles">Shop curated sets <ArrowRight size={15}/></Link></div>
            <div className="mm-proof"><MessageCircle size={17}/><span>Build your basket here, finish your order on WhatsApp.</span></div>
          </div>

          <div className="mm-hero-stage reveal-scale">
            <span className="mm-stage-copy">BIG TASTE<br/>STARTS HERE</span>
            <div className="mm-ring mm-ring-a" />
            <div className="mm-ring mm-ring-b" />
            <div className="mm-product mm-product-left"><Image src="/products/chicken-tikka-masala.jpg" alt="Chicken Tikka Masala" fill priority sizes="30vw" /></div>
            <div className="mm-product mm-product-right"><Image src="/products/seekh-kabab-masala.jpg" alt="Seekh Kabab Masala" fill priority sizes="30vw" /></div>
            <div className="mm-product mm-product-main"><Image src="/products/biryani-masala.jpg" alt="Biryani Masala" fill priority sizes="34vw" /></div>
            <div className="mm-burst">100%<br/><b>FULL-ON</b><br/>FLAVOUR</div>
            <span className="mm-float-chip chip-one">Biryani night</span>
            <span className="mm-float-chip chip-two">BBQ plans</span>
          </div>
        </div>
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

      <section id="categories" className="wrap mm-section mm-category-section">
        <div className="mm-section-intro">
          <p className="mm-kicker"><Sparkles size={14}/> Pick your mood</p>
          <h2>What are we cooking?</h2>
        </div>
        <div className="mm-category-grid">
          {categories.map((category, i) => {
            const meta = categoryMeta[i];
            const Icon = meta.icon;
            return (
              <Link key={category} className={`mm-category-card ${meta.tone}`} href={`/shop?category=${encodeURIComponent(category)}`}>
                <div className="mm-category-icon"><Icon size={28}/></div>
                <div><span>0{i + 1}</span><h3>{category}</h3><p>{meta.note}</p></div>
                <ArrowRight className="mm-card-arrow" size={22}/>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mm-feature-band" id="featured">
        <div className="wrap mm-section">
          <div className="mm-section-heading">
            <div><p className="mm-kicker"><Flame size={14}/> Featured blends</p><h2>Start with the <em>good stuff.</em></h2></div>
            <Link href="/shop?category=Recipe%20Blends" className="mm-text-link">See all recipe blends <ArrowRight size={17}/></Link>
          </div>
          <div className="product-grid mm-product-grid">{featured.map((p)=><ProductCard key={p.id} product={p}/>)}</div>
        </div>
      </section>

      <Bundles />

      <section className="wrap mm-editorial">
        <div className="mm-editorial-copy">
          <p className="mm-kicker"><Leaf size={14}/> Everyday essentials</p>
          <h2>Your shelf should look <em>this alive.</em></h2>
          <p>Keep the basics close and the possibilities wide open—cumin, coriander, turmeric, ginger, garlic and pepper for whatever you cook next.</p>
          <Link className="mm-button mm-button-yellow" href="/shop?category=Everyday%20Spices">Shop everyday spices <ArrowRight size={18}/></Link>
          <div className="mm-word-stack"><span>CUMIN</span><span>CORIANDER</span><span>TURMERIC</span></div>
        </div>
        <div className="mm-editorial-visual">
          <div className="mm-sun" />
          <div className="mm-editorial-product"><Image src="/products/turmeric-powder.jpg" alt="Magnet Masala Turmeric Powder" fill sizes="(max-width:700px) 70vw, 35vw"/></div>
          <span className="mm-orbit orbit-one">golden</span><span className="mm-orbit orbit-two">earthy</span><span className="mm-orbit orbit-three">everyday</span>
        </div>
      </section>

      <section className="wrap mm-section">
        <div className="mm-section-heading">
          <div><p className="mm-kicker"><Sparkles size={14}/> Fast flavour</p><h2>Snack time, but <em>better.</em></h2></div>
          <Link className="mm-text-link" href="/shop?category=Quick%20Seasonings">See quick seasonings <ArrowRight size={17}/></Link>
        </div>
        <div className="snack-grid mm-product-grid">{snacks.map((p)=><ProductCard key={p.id} product={p}/>)}</div>
      </section>

      <section className="wrap mm-ordering">
        <div className="mm-order-intro"><p className="mm-kicker"><MessageCircle size={14}/> Easy ordering</p><h2>Pick. Basket. <em>WhatsApp.</em></h2><p>Your favourite masalas are only a few taps away.</p></div>
        <div className="mm-steps">
          {[['01','Pick your favourites','Browse the range and add what you need.'],['02','Review your basket','Check quantities and delivery details.'],['03','Continue on WhatsApp','Send the prepared message and confirm your order.']].map(([n,t,d])=><div className="mm-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>
    </main>
  );
}
