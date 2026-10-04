export type ProductVariant = {
  id: string;
  weight: string;
  originalPrice: number;
  salePrice: number;
  image?: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  variants: ProductVariant[];
  tags: string[];
  featured: boolean;
  shortDescription: string;
  recommendedFor: string[];
  mediaScale: number;
  gallery?: { src: string; alt: string }[];
  ingredients?: string;
  directions?: string;
  storageInformation?: string;
};

const v = (id: string, weight: string, originalPrice: number, salePrice: number, image?: string, inStock = true): ProductVariant => ({ id, weight, originalPrice, salePrice, image, inStock });
const product = (id: string, name: string, category: string, image: string, variants: ProductVariant[], description: string, tags: string[], featured = false, mediaScale = 1): Product => ({ id, slug: id, name: `Magnet ${name}`, category, image, variants, shortDescription: description, tags, recommendedFor: tags, featured, mediaScale });

export const categories = ["Recipe Blends", "Everyday Spices", "Quick Seasonings"];
export const products: Product[] = [
  product("biryani-masala", "Biryani Masala", "Recipe Blends", "/products/biryani-masala.jpg", [v("biryani-125", "125g", 400, 320), v("biryani-250", "250g", 690, 550, "/products/biryani-masala-250gram.jpg")], "Premium quality spice mix", ["Rice", "biryani", "weekend cooking"], true),
  product("chicken-tikka-masala", "Chicken Tikka Masala", "Recipe Blends", "/products/chicken-tikka-masala.jpg", [v("chicken-tikka-125", "125g", 445, 356), v("chicken-tikka-250", "250g", 690, 550, "/products/chikan-tikka-masala250gram.jpg")], "BBQ and grill spice mix", ["BBQ", "chicken", "tikka"], true),
  product("seekh-kabab-masala", "Seekh Kabab Masala", "Recipe Blends", "/products/seekh-kabab-masala.jpg", [v("seekh-kabab-125", "125g", 400, 320), v("seekh-kabab-250", "250g", 650, 520, "/products/seekh-kabab-masala-250gram.jpg")], "For the dishes you love coming home to.", ["BBQ", "kabab"], true),
  product("garam-masala", "Garam Masala", "Recipe Blends", "/products/garam-masala.jpg", [v("garam-125", "125g", 550, 440), v("garam-250", "250g", 1050, 840, "/products/garam-masala-250gram.jpg")], "Premium spice blend", ["Curry", "everyday cooking"], true, 1.25),
  product("fish-masala", "Fish Masala", "Recipe Blends", "/products/fish-masala.jpg", [v("fish-125", "125g", 375, 300), v("fish-250", "250g", 600, 480, "/products/fish-masala-250gram.jpg")], "Special seafood spice mix", ["Fish", "seafood"] , false, 1.25),
  product("salan-masala", "Salan Masala", "Recipe Blends", "/products/salan-masala.jpg", [v("salan-125", "125g", 360, 288), v("salan-250", "250g", 680, 550, "/products/salan-masala-250gram.jpg")], "Premium Curry spice mix", ["Curry", "salan"], false, 1.25),
  product("coriander-powder", "Coriander Powder", "Everyday Spices", "/products/coriander-powder.jpg", [v("coriander-125", "125g", 200, 160)], "A familiar essential for your kitchen shelf.", ["Kitchen essentials", "dhania"]),
  product("cumin-powder", "Cumin Powder", "Everyday Spices", "/products/cumin-powder.jpg", [v("cumin-125", "125g", 465, 372)], "A familiar essential for your kitchen shelf.", ["Kitchen essentials", "zeera"]),
  product("turmeric-powder", "Turmeric Powder", "Everyday Spices", "/products/turmeric-powder.jpg", [v("turmeric-125", "125g", 250, 200), v("turmeric-250", "250g", 450, 360, "/products/turmeric-powder-250gram.jpg")], "Pure and natural Haldi powder", ["Kitchen essentials", "haldi"]),
  product("black-pepper-powder", "Black Pepper Powder", "Everyday Spices", "/products/black-pepper-powder.jpg", [v("black-pepper-125", "125g", 535, 428)], "A familiar essential for your kitchen shelf.", ["Kitchen essentials", "kali mirch"]),
  product("garlic-powder", "Garlic Powder", "Everyday Spices", "/products/garlic-powder.jpg", [v("garlic-125", "125g", 435, 348), v("garlic-250", "250g", 800, 640, "/products/garlic-powder-250gram.jpg")], "Premium and natural Garlic (Lehsan) powder", ["Kitchen essentials", "lehsan"]),
  product("ginger-powder", "Ginger Powder", "Everyday Spices", "/products/ginger-powder.jpg", [v("ginger-125", "125g", 440, 352)], "A familiar essential for your kitchen shelf.", ["Kitchen essentials", "adrak"]),
  product("cheese-powder", "Cheese Powder", "Quick Seasonings", "/products/cheese-powder-125gram.jpg", [v("cheese-125", "125g", 440, 352, "/products/cheese-powder-125gram.jpg"), v("cheese-250", "250g", 760, 610, "/products/cheese-powder.jpg")], "Premium flavoring spice mix", ["Cheese", "snacks"]),
  product("red-chilli-powder", "Red Chilli Powder", "Everyday Spices", "/products/red-chilli-powder-125gram.jpg", [v("red-chilli-125", "125g", 200, 160, "/products/red-chilli-powder-125gram.jpg"), v("red-chilli-250", "250g", 350, 280, "/products/red-chilli-powder-250gram.jpg")], "Pure and premium spice", ["Kitchen essentials", "mirch"]),
  product("chaat-masala", "Chaat Masala", "Quick Seasonings", "/products/chaat-masala-125gram.jpg", [v("chaat-125", "125g", 230, 184, "/products/chaat-masala-125gram.jpg"), v("chaat-250", "250g", 380, 300, "/products/chaat-masala-250gram.jpg")], "Tangy and spicy seasoning mix", ["Chaat", "snacks"]),
  product("macaroni-masala-powder", "Macaroni Masala", "Quick Seasonings", "/products/macaroni-masala-powder.jpg", [v("macaroni-125", "125g", 360, 288)], "For snack breaks with a little more flavour.", ["Pasta", "macaroni", "snacks"]),
  product("fries-masala", "Fries Masala", "Quick Seasonings", "/products/fries-masala.jpg", [v("fries-125", "125g", 380, 304)], "For snack breaks with a little more flavour.", ["Fries", "potatoes", "snacks"]),
];

export function getSelectedVariant(product: Product, variantId?: string): ProductVariant {
  return product.variants.find(variant => variant.id === variantId) ?? product.variants[0];
}
export function variantImage(product: Product, variant: ProductVariant): string {
  return variant.image || product.image;
}
export function priceLabel(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}
export const originalPrice = (variant: ProductVariant): number => variant.originalPrice;
export const discountPercent = (variant: ProductVariant): number => Math.round((variant.originalPrice - variant.salePrice) * 100 / variant.originalPrice);
