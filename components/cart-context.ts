import { createContext } from "react";

export type CartItem = { id: string; variantId: string; quantity: number };
export type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  add: (id: string, variantId?: string, q?: number, open?: boolean) => void;
  update: (id: string, variantId: string, q: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  notifyAdded: (message: string) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);
