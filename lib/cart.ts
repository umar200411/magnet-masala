import { getSelectedVariant, products } from "@/lib/catalog";

export type CartLineIdentity = { id: string; variantId: string };
export type CartLineQuantity = CartLineIdentity & { quantity: number };
export const cartItemKey = (item: CartLineIdentity) => `${item.id}::${item.variantId}`;

export function cartTotal(items: readonly CartLineQuantity[]) {
  return items.reduce((total, item) => {
    const product = products.find(candidate => candidate.id === item.id);
    return total + (product ? getSelectedVariant(product, item.variantId).salePrice * item.quantity : 0);
  }, 0);
}
