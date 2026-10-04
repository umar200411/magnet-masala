import { getSelectedVariant, products, priceLabel } from "./catalog";
export type OrderItem = { id: string; variantId: string; quantity: number };
export type Customer = { name: string; phone: string; city: string; address: string; note: string };

export function orderMessage(items: OrderItem[], customer?: Customer) {
  if (!items.length) throw new Error("An order must contain at least one item.");
  const lines = items.map((item, index) => {
    const product = products.find(candidate => candidate.id === item.id);
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error("Invalid product or quantity.");
    const variant = getSelectedVariant(product, item.variantId);
    const subtotal = variant.salePrice * item.quantity;
    return { subtotal, text: `${index + 1}. ${product.name}\n   Pack: ${variant.weight}\n   Qty: ${item.quantity}\n   Price: ${priceLabel(variant.salePrice)} each\n   Subtotal: ${priceLabel(subtotal)}` };
  });
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const details = customer ? `\n\nCUSTOMER DETAILS\n\nName: ${customer.name.trim()}\nPhone: ${customer.phone.trim()}\nCity: ${customer.city.trim()}\nAddress: ${customer.address.trim()}${customer.note.trim() ? `\nNote: ${customer.note.trim()}` : ""}` : "";
  return `Magnet Masala Order\n\n${lines.map(line => line.text).join("\n\n")}\n\nOrder Total: ${priceLabel(total)}${details}\n\nPlease confirm availability, prices, delivery charges and expected delivery time.\n\nThank you.`;
}

export function whatsappUrl(number: string, message: string) {
  const digits = number.replace(/[\s()+-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
