import { products, priceLabel } from "./catalog";
export type OrderItem = { id: string; quantity: number };
export type Customer = { name: string; phone: string; city: string; address: string; note: string };

export function orderMessage(items: OrderItem[], customer?: Customer) {
  if (!items.length) throw new Error("An order must contain at least one item.");
  const lines = items.map((item, index) => {
    const product = products.find(p => p.id === item.id);
    if (!product || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      throw new Error("Invalid product or quantity.");
    }
    return { product, quantity: item.quantity, text: `${index + 1}. ${product.name}\n   Weight: ${product.weight}\n   Quantity: ${item.quantity}\n   Unit price: ${priceLabel(product)}${product.price !== null ? `\n   Total: Rs. ${(product.price * item.quantity).toLocaleString("en-PK")}` : ""}` };
  });
  const subtotal = lines.every(line => line.product.price !== null)
    ? `Subtotal: Rs. ${lines.reduce((sum, line) => sum + line.product.price! * line.quantity, 0).toLocaleString("en-PK")}`
    : "Please confirm product prices.";
  const details = customer ? `\n\nCUSTOMER DETAILS\n\nName: ${customer.name.trim()}\nPhone: ${customer.phone.trim()}\nCity: ${customer.city.trim()}\nAddress: ${customer.address.trim()}${customer.note.trim() ? `\nNote: ${customer.note.trim()}` : ""}` : "";
  return `Hello Magnet Masala,\n\nI would like to place an order.\n\nORDER DETAILS\n\n${lines.map(line => line.text).join("\n\n")}\n\n${subtotal}${details}\n\nPlease confirm availability, delivery charges and expected delivery time.\n\nThank you.`;
}

export function whatsappUrl(number: string, message: string) {
  const digits = number.replace(/[\s()+-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
