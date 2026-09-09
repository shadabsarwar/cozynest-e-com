export function createWhatsAppLink(
  number,
  message = "Hi CozyNest, I would love to know more about your collection.",
) {
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
