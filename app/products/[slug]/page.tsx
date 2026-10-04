import Link from "@/components/store-link";
import { notFound } from "next/navigation";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { RecentlyViewed } from "@/components/recently-viewed";

const productPairs: Record<string, string[]> = {
  "biryani-masala": ["garam-masala", "garlic-powder", "ginger-powder"],
  "fries-masala": ["cheese-powder", "chaat-masala"],
  "chicken-tikka-masala": ["chaat-masala", "garam-masala"],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug);
  return { title: product?.name || "Product not found", description: product ? `${product.name}. ${product.shortDescription} Choose a pack size and order through WhatsApp.` : undefined };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug);
  if (!product) notFound();
  const pairedIds = productPairs[product.id] ?? products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 4).map(item => item.id);
  const pairedProducts = pairedIds.flatMap(id => { const related = products.find(item => item.id === id); return related && related.id !== product.id ? [related] : []; });
  return <main id="main" className="wrap page"><nav className="breadcrumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>{product.name}</span></nav><div className="detail-grid"><ProductDetail product={product} /></div><RecentlyViewed currentId={product.id} /><section className="section related-section"><div className="section-heading"><h2>Pairs well with</h2><Link className="text-link" href="/shop">Explore the range</Link></div><div className="product-grid">{pairedProducts.map(item => <ProductCard key={item.id} product={item} />)}</div></section></main>;
}
