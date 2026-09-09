import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../data/products";
import { readStorage, writeStorage } from "../utils/storage";
import { cartTotal, clampQuantity, sanitizeCart } from "../utils/cart";
const CartContext = createContext();
const WishlistContext = createContext();
const AuthContext = createContext();
const ToastContext = createContext();
export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
export const useAuth = () => useContext(AuthContext);
export const useToast = () => useContext(ToastContext);
export default function StoreProvider({ children }) {
  const [cart, setCart] = useState(() =>
    sanitizeCart(readStorage("cart", []), products),
  );
  const [wishlist, setWishlist] = useState(() => {
    const v = readStorage("wishlist", []);
    return Array.isArray(v)
      ? v.filter((id) => products.some((p) => p.id === id))
      : [];
  });
  const [currentUser, setUser] = useState(() => {
    const u =
      readStorage("session", null) ||
      readStorage("session", null, "sessionStorage");
    return u && typeof u.email === "string" && typeof u.firstName === "string"
      ? u
      : null;
  });
  const [toast, setToast] = useState(null);
  const notify = (message) => setToast({ message, id: Date.now() });
  useEffect(() => {
    writeStorage("cart", cart);
  }, [cart]);
  useEffect(() => {
    writeStorage("wishlist", wishlist);
  }, [wishlist]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  const items = cart.map((item) => ({
    ...products.find((p) => p.id === item.id),
    quantity: item.quantity,
  }));
  const update = (id, delta) =>
    setCart((v) =>
      v.map((x) =>
        x.id === id ? { ...x, quantity: clampQuantity(x.quantity + delta) } : x,
      ),
    );
  const cartApi = {
    items,
    addToCart: (p, quantity = 1) => {
      setCart((v) =>
        v.some((x) => x.id === p.id)
          ? v.map((x) =>
              x.id === p.id
                ? { ...x, quantity: clampQuantity(x.quantity + quantity) }
                : x,
            )
          : [...v, { id: p.id, quantity: clampQuantity(quantity) }],
      );
      notify("Added to cart");
    },
    removeFromCart: (id) => {
      setCart((v) => v.filter((x) => x.id !== id));
      notify("Removed from cart");
    },
    increaseQuantity: (id) => update(id, 1),
    decreaseQuantity: (id) => update(id, -1),
    clearCart: () => setCart([]),
    getCartTotal: () => cartTotal(items),
    getCartCount: () => cart.reduce((n, x) => n + x.quantity, 0),
  };
  const wishlistApi = {
    wishlist,
    toggleWishlist: (id) => {
      setWishlist((v) =>
        v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
      );
      notify(
        wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist",
      );
    },
  };
  const session = (user, remember) => {
    writeStorage("session", null);
    writeStorage("session", null, "sessionStorage");
    writeStorage("session", user, remember ? "localStorage" : "sessionStorage");
    setUser(user);
  };
  const authApi = {
    currentUser,
    isAuthenticated: !!currentUser,
    login: ({ email, remember }) => {
      session({ email, firstName: email.split("@")[0] }, remember);
      notify("Demo login successful");
    },
    register: ({ firstName, lastName, email }) => {
      session({ firstName, lastName, email }, true);
      notify("Demo account created");
    },
    logout: () => {
      session(null, false);
      notify("You have signed out");
    },
  };
  return (
    <ToastContext.Provider value={notify}>
      <AuthContext.Provider value={authApi}>
        <WishlistContext.Provider value={wishlistApi}>
          <CartContext.Provider value={cartApi}>
            {children}
            <div className="toast-region" role="status" aria-live="polite">
              {toast && (
                <div className="toast" key={toast.id}>
                  <span>✓</span> {toast.message}
                  <button
                    aria-label="Dismiss notification"
                    onClick={() => setToast(null)}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </CartContext.Provider>
        </WishlistContext.Provider>
      </AuthContext.Provider>
    </ToastContext.Provider>
  );
}
