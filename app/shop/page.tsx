import { Suspense } from "react";
import { Shop, ShopFromUrl } from "@/components/shop";

export const metadata = { title: "Shop all masalas", description: "Browse Magnet Masala recipe blends, everyday spices and quick seasonings." };

export default function Page() {
  return <main id="main" className="wrap page"><p className="eyebrow red">THE MAGNET MASALA SHELF</p><h1>Find your <em>flavour.</em></h1><p className="intro">Everyday essentials, favourite recipes and a little something for snack time.</p><Suspense fallback={<Shop />}><ShopFromUrl /></Suspense></main>;
}
