import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/StoreProvider";
import { Price, Rating, WishlistButton } from "./ProductCard";
import WhatsAppButton from "./WhatsAppButton";
export function Quantity({ value, decrease, increase }) {
  return (
    <div className="quantity" aria-label="Quantity">
      <button
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={decrease}
      >
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button
        aria-label="Increase quantity"
        disabled={value >= 99}
        onClick={increase}
      >
        +
      </button>
    </div>
  );
}
export default function ProductDetails({ product, quick = false }) {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(product.image);
  const { addToCart } = useCart();
  return (
    <div className="product-detail">
      <div className="gallery">
        <img
          className="detail-image"
          src={selected}
          alt={product.name}
          width="600"
          height="720"
        />
        <div className="thumbnails">
          {product.images.map((image, i) => (
            <button
              key={image}
              aria-label={`View image ${i + 1}`}
              aria-pressed={selected === image}
              onClick={() => setSelected(image)}
            >
              <img src={image} alt={product.name} width="72" height="86" />
            </button>
          ))}
        </div>
      </div>
      <div className="detail-copy">
        <Link className="eyebrow" to={`/shop?category=${product.category}`}>
          {product.category} / THE COZYNEST COLLECTION
        </Link>
        <h1>{product.name}</h1>
        <Rating product={product} />
        <p className="detail-price">
          <Price product={product} />
        </p>
        <p>{product.description}</p>
        <p className="muted">Thoughtfully chosen. Beautifully yours.</p>
        <div className="purchase-row">
          <Quantity
            value={quantity}
            decrease={() => setQuantity((v) => v - 1)}
            increase={() => setQuantity((v) => v + 1)}
          />
          <button
            className="button"
            onClick={() => addToCart(product, quantity)}
          >
            Add to cart
          </button>
          <WishlistButton product={product} />
        </div>
        <WhatsAppButton product={product} />
        {quick ? (
          <Link className="text-link" to={`/product/${product.id}`}>
            View all product details →
          </Link>
        ) : (
          <div className="accordions">
            {[
              ["Description", product.description],
              [
                "Materials",
                "Please inquire for the exact composition, dimensions, and available variations of this piece.",
              ],
              [
                "Shipping",
                "Shipping charges and delivery estimates will be confirmed before you place an order.",
              ],
              [
                "Returns",
                "Please contact us to confirm return eligibility before ordering.",
              ],
              [
                "Care",
                "Keep your piece dry and handle gently. Ask us for material-specific care instructions.",
              ],
            ].map(([name, text]) => (
              <details key={name}>
                <summary>{name}</summary>
                <p>{text}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
