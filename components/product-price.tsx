import { originalPrice, priceLabel, type Product } from "@/lib/catalog";

export function ProductPrice({ product }: { product: Product }) {
  const original = originalPrice(product);
  return <span className="product-pricing">
    <strong><span className="sr-only">Sale price: </span>{priceLabel(product)}</strong>
    {original !== null && <>
      <span className="original-price"><span className="sr-only">Original price: </span><s>Rs. {original.toLocaleString("en-PK", { maximumFractionDigits: 2 })}</s></span>
      <span className="sale-badge">20% OFF</span>
    </>}
  </span>;
}
