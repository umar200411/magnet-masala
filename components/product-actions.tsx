"use client";
import { useState } from "react";
import { Quantity, AddButton } from "./store";
import { OrderButton } from "./order-button";

export function ProductActions({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  return <div className="product-actions"><span>Quantity</span><Quantity value={quantity} onChange={setQuantity} /><div className="product-buttons"><AddButton id={id} quantity={quantity} /><OrderButton id={id} quantity={quantity} /></div><p className="muted">Your item and quantity will open in WhatsApp. Review the message and press Send.</p></div>;
}
