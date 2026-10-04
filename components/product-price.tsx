import { discountPercent, priceLabel, type ProductVariant } from "@/lib/catalog";

export function SaleBadge({ variant }: { variant: ProductVariant }) {
  return <span className="sale-badge">{discountPercent(variant)}% OFF</span>;
}

export function ProductPrice({ variant, showDiscount = true }: { variant: ProductVariant; showDiscount?: boolean }) {
  return <span className="product-pricing">
    <strong><span className="sr-only">Sale price: </span>{priceLabel(variant.salePrice)}</strong>
    <span className="original-price"><span className="sr-only">Original price: </span><s>{priceLabel(variant.originalPrice)}</s></span>
    {showDiscount && <SaleBadge variant={variant} />}
  </span>;
}

export function ProductVariantSelector({ variants, selectedId, onSelect, className = "" }: { variants: ProductVariant[]; selectedId: string; onSelect: (id: string) => void; className?: string }) {
  if (variants.length < 2) return <div className={`variant-single ${className}`}><span>Pack size</span><strong>{variants[0].weight}</strong></div>;
  return <div className={`variant-control ${className}`}>
    <span className="variant-label">Pack size</span>
    <div className="variant-selector" role="group" aria-label="Select pack size">
      {variants.map(variant => <button key={variant.id} type="button" className={`${selectedId === variant.id ? "selected" : ""}${variant.inStock ? "" : " unavailable"}`} aria-pressed={selectedId === variant.id} aria-label={`${variant.weight}${variant.inStock ? "" : ", out of stock"}`} title={variant.inStock ? variant.weight : `${variant.weight} — out of stock`} onClick={() => onSelect(variant.id)}>{variant.weight}{!variant.inStock && <span className="sr-only"> — out of stock</span>}</button>)}
    </div>
  </div>;
}
