import { products } from "./catalog";

export const bundles = [
  { id: "bbq", name: "The BBQ set", occasion: "For the weekend grill", description: "Tikka, seekh kabab and a little extra warmth for your next gathering.", tone: "ember", ids: ["chicken-tikka-masala", "seekh-kabab-masala", "garam-masala"] },
  { id: "everyday", name: "Everyday essentials", occasion: "Your kitchen starting point", description: "Three familiar staples to keep close for everyday cooking.", tone: "herb", ids: ["coriander-powder", "cumin-powder", "turmeric-powder"] },
  { id: "biryani", name: "The biryani kit", occasion: "Make a night of it", description: "Biryani masala with ginger and garlic for your favourite rice recipe.", tone: "saffron", ids: ["biryani-masala", "ginger-powder", "garlic-powder"] },
] as const;

export function bundleProducts(ids: readonly string[]) {
  return ids.map(id => {
    const product = products.find(product => product.id === id);
    if (!product) throw new Error(`Unknown bundle product: ${id}`);
    return product;
  });
}
export function bundleTotal(ids: readonly string[]) {
  const selected = bundleProducts(ids);
  return selected.some(product => product.price === null) ? null : selected.reduce((sum, product) => sum + product.price!, 0);
}
