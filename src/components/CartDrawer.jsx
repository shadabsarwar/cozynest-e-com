import { Link } from "react-router-dom";
import { useCart } from "../hooks/StoreProvider";
import { money } from "../config/store";
import Modal from "./Modal";
import { Quantity } from "./ProductDetails";
import Icon from "./Icon";
export function EmptyState({ title, text, onClose }) {
  return (
    <div className="empty-state">
      <Icon name="bag" size={44} />
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      <Link className="button" to="/shop" onClick={onClose}>
        Explore collection <Icon name="arrow" />
      </Link>
    </div>
  );
}
export function CartContents({ onClose }) {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    clearCart,
  } = useCart();
  if (!items.length)
    return (
      <EmptyState
        title="Your cart is feeling a little empty."
        text="Let's find something you'll love."
        onClose={onClose}
      />
    );
  return (
    <>
      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <Link to={`/product/${item.id}`} onClick={onClose}>
              <img src={item.image} alt={item.name} width="90" height="110" />
            </Link>
            <div>
              <Link to={`/product/${item.id}`} onClick={onClose}>
                <h3>{item.name}</h3>
              </Link>
              <p>{money(item.price)}</p>
              <Quantity
                value={item.quantity}
                decrease={() => decreaseQuantity(item.id)}
                increase={() => increaseQuantity(item.id)}
              />
            </div>
            <div className="cart-item-end">
              <button
                className="icon-button"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeFromCart(item.id)}
              >
                <Icon name="close" size={18} />
              </button>
              <strong>{money(item.price * item.quantity)}</strong>
            </div>
          </article>
        ))}
        <button className="text-link" onClick={clearCart}>
          Clear cart
        </button>
      </div>
      <div className="cart-summary">
        <div>
          <span>Subtotal</span>
          <strong>{money(getCartTotal())}</strong>
        </div>
        <div>
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="total">
          <span>Estimated total</span>
          <strong>{money(getCartTotal())}</strong>
        </div>
        <Link className="button full" to="/checkout" onClick={onClose}>
          Continue to checkout <Icon name="arrow" />
        </Link>
        <p className="small muted">Taxes and shipping are not included.</p>
        {onClose && (
          <Link className="text-link" to="/cart" onClick={onClose}>
            View your cart
          </Link>
        )}
      </div>
    </>
  );
}
export default function CartDrawer({ onClose }) {
  const { getCartCount } = useCart();
  return (
    <Modal
      title={`Your cart (${getCartCount()})`}
      onClose={onClose}
      drawer
      className="cart-drawer"
    >
      <CartContents onClose={onClose} />
    </Modal>
  );
}
