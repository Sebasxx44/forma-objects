import type { CartLine } from "@/types";

export const parseStoredCart = (raw: string | null, validProductIds: readonly string[]): CartLine[] => {
  try {
    const saved = JSON.parse(raw ?? "[]") as CartLine[];
    if (!Array.isArray(saved)) return [];
    const normalized = new Map<string, CartLine>();
    saved.forEach((item: CartLine) => {
      if (!item || typeof item !== "object" || typeof item.productId !== "string" ||
        !validProductIds.includes(item.productId) ||
        !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 20) return;
      const existing = normalized.get(item.productId);
      normalized.set(item.productId, {
        productId: item.productId,
        quantity: Math.min(20, (existing?.quantity ?? 0) + item.quantity),
      });
    });
    return [...normalized.values()];
  } catch { return []; }
};
