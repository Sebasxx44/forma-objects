import { useCallback, useEffect, useMemo, useState } from "react";
import { products } from "@/content";
import { parseStoredCart } from "@/composables/cartStorage";
import type { CartLine, CartState } from "@/types";

// Storage
const STORAGE_KEY = "forma-objects-cart-v1";
const loadCart = (): CartLine[] => {
  try {
    return parseStoredCart(localStorage.getItem(STORAGE_KEY), products.map((product) => product.id));
  } catch { return []; }
};

export const useCart = (): CartState => {
  // State
  const [lines, setLines] = useState<CartLine[]>(loadCart);

  // Effects
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)); } catch { /* Storage may be unavailable in private mode. */ }
  }, [lines]);

  // Actions
  const add = useCallback((productId: string) => {
    if (!products.some((product) => product.id === productId)) return;
    setLines((current) => {
      const line = current.find((item) => item.productId === productId);
      return line
        ? current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(20, item.quantity + 1) } : item)
        : [...current, { productId, quantity: 1 }];
    });
  }, []);
  const changeQuantity = useCallback((productId: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    setLines((current) => quantity <= 0
      ? current.filter((item) => item.productId !== productId)
      : current.map((item) => item.productId === productId ? { ...item, quantity: Math.min(20, Math.floor(quantity)) } : item));
  }, []);
  const clear = useCallback(() => setLines([]), []);

  // Derived state
  const items = useMemo(() => lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  }), [lines]);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  return {
    selection: { items, count },
    totals: { subtotal },
    actions: { add, changeQuantity, clear },
  };
};
