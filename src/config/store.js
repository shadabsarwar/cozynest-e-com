export const store = {
  name: "CozyNest",
  currency: "USD",
  locale: "en-US",
  whatsappNumber:
    import.meta.env.VITE_WHATSAPP_NUMBER || "YOUR_WHATSAPP_NUMBER",
  socialLinks: { Instagram: "", Facebook: "", Pinterest: "" },
};
export const money = (value) =>
  new Intl.NumberFormat(store.locale, {
    style: "currency",
    currency: store.currency,
  }).format(value);
