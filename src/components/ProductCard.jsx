import { Link } from "react-router-dom";
import { useCart, useWishlist } from "../hooks/StoreProvider";
import { money } from "../config/store";
import Icon from "./Icon";
export function WishlistButton({ product }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const active = wishlist.includes(product.id);
  return (
    <button
      className={`icon-button wishlist-button ${active ? "saved" : ""}`}
      aria-label={`${active ? "Remove" : "Add"} ${product.name} ${active ? "from" : "to"} wishlist`}
      aria-pressed={active}
      onClick={() => toggleWishlist(product.id)}
    >
      <Icon name="heart" />
    </button>
  );
}
export function Rating({ product }) {
  return (
    <span className="rating">
      {product.rating
        ? `★ ${product.rating} (${product.reviews})`
        : "☆ Be the first to review"}
    </span>
  );
}
export function Price({ product }) {
  return (
    <span className="price">
      {money(product.price)}{" "}
      {product.oldPrice && <del>{money(product.oldPrice)}</del>}
    </span>
  );
}
export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            width="400"
            height="500"
            loading="lazy"
          />
        </Link>
        {product.badge && <span className="badge">{product.badge}</span>}
        <WishlistButton product={product} />
        <button className="quick-view" onClick={() => onQuickView(product)}>
          <Icon name="eye" size={18} /> Quick view
        </button>
      </div>
      <div className="product-meta">
        <span className="eyebrow">{product.category}</span>
        <Rating product={product} />
      </div>
      <h3>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <div className="product-bottom">
        <Price product={product} />
        <button
          className="add-button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => addToCart(product)}
        >
          <span>Add to cart</span>
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  );
}
export function ProductGrid({ products, onQuickView }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
