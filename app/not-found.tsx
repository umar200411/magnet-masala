import Link from "@/components/store-link";

export default function NotFound() {
  return <main id="main" className="wrap page empty"><p className="eyebrow red">PAGE NOT FOUND</p><h1>Let’s head back<br />to the kitchen.</h1><p>This page isn’t on our shelf. Find your next favourite below.</p><div className="product-buttons"><Link className="button outline" href="/">Back to Home</Link><Link className="button" href="/shop/">Shop Products</Link></div></main>;
}
