export const clampQuantity = (n) =>
  Math.max(1, Math.min(99, Math.floor(Number(n) || 1)));
export function sanitizeCart(value, products) {
  return Array.isArray(value)
    ? value
        .filter(
          (v, i, all) =>
            v &&
            products.some((p) => p.id === v.id) &&
            all.findIndex((x) => x?.id === v.id) === i,
        )
        .map((v) => ({ id: v.id, quantity: clampQuantity(v.quantity) }))
    : [];
}
export const cartTotal = (items) =>
  items.reduce(
    (total, item) => total + Math.round(item.price * 100) * item.quantity,
    0,
  ) / 100;
