import { asset } from "./products";
export const categories = [
  ["Clothing", "Everyday, beautifully layered", "product-showcase-1.jpg"],
  ["Candles", "A little light. A slower moment.", "product-showcase-2.jpg"],
  ["Accessories", "The thoughtful finishing touch", "product-showcase-3.jpg"],
  ["Bags", "Carry a little character", "product-showcase-5.jpg"],
  ["Clocks", "Make time for beautiful things", "off-2.jpg"],
  ["Jewellery", "Small details, lasting impressions", "new-product-5.jpg"],
  ["Decor", "Make yourself at home", "slide-3.jpg"],
].map(([name, description, image]) => ({
  name,
  description,
  image: asset(image),
}));
