import { ProductPrice } from "@/components/product-price";
import {QuickView} from "./quick-view";
import {OrderButton} from "./order-button";
import {ProductImage} from "./product-image";import Link from "next/link";import {Product} from "@/lib/catalog";import {AddButton} from "./store";
export function ProductCard({product:p}:{product:Product}){return <article className="product-card"><Link className="product-media" href={`/products/${p.slug}`}><ProductImage src={p.image} alt={`${p.name}, ${p.weight} jar`} fill sizes="(max-width:600px) 46vw, (max-width:1000px) 30vw, 24vw" style={{objectFit:"contain",transform:`scale(${p.mediaScale})`}}/></Link><div className="card-info"><span className="eyebrow">{p.category}</span><Link href={`/products/${p.slug}`}><h3>{p.name}</h3></Link><span className="muted">{p.weight}</span><div className="card-bottom"><ProductPrice product={p}/><AddButton id={p.id} compact/></div><QuickView product={p}/><OrderButton id={p.id} compact/></div></article>}
