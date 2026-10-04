"use client";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { Quantity, AddButton } from "./store";
import { OrderButton } from "./order-button";

export function ProductActions({ product, variantId }: { product: Product; variantId: string }) {
  const [quantity, setQuantity] = useState(1);
  return <div className="product-actions"><span>Quantity</span><Quantity value={quantity} onChange={setQuantity} /><div className="product-buttons"><AddButton id={product.id} variantId={variantId} quantity={quantity} /><OrderButton id={product.id} variantId={variantId} quantity={quantity} /></div><p className="muted">Your item and quantity will open in WhatsApp. Review the message and press Send.</p></div>;
}
