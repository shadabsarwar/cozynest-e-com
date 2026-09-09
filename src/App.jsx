import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useParams, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer, { CartContents, EmptyState } from "./components/CartDrawer";
import Modal from "./components/Modal";
import ProductDetails from "./components/ProductDetails";
import SearchBar from "./components/SearchBar";
import WhatsAppButton from "./components/WhatsAppButton";
import { ProductGrid } from "./components/ProductCard";
import { useWishlist } from "./hooks/StoreProvider";
import { products } from "./data/products";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Information, {
  Account,
  Article,
  Checkout,
  Journal,
  NotFound,
} from "./pages/Information";
function Product({ onQuickView }) {
  const { id } = useParams();
  const p = products.find((p) => p.id === id);
  if (!p) return <NotFound />;
  return (
    <section className="section">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.name}
      </div>
      <ProductDetails key={p.id} product={p} />
      <div className="related">
        <p className="eyebrow">A FEW MORE THINGS TO LOVE</p>
        <h2>Lovely together</h2>
        <ProductGrid
          products={products
            .filter((x) => x.id !== id && x.category === p.category)
            .slice(0, 4)}
          onQuickView={onQuickView}
        />
      </div>
    </section>
  );
}
function Wishlist({ onQuickView }) {
  const { wishlist } = useWishlist();
  const saved = products.filter((p) => wishlist.includes(p.id));
  return (
    <section className="section">
      <div className="page-heading">
        <p className="eyebrow">KEPT CLOSE TO YOUR HEART</p>
        <h1>Your lovely little list.</h1>
        <p>{saved.length} saved pieces</p>
      </div>
      {saved.length ? (
        <ProductGrid products={saved} onQuickView={onQuickView} />
      ) : (
        <EmptyState title="Your wishlist is waiting for something special." />
      )}
    </section>
  );
}
export default function App() {
  const [cart, setCart] = useState(false);
  const [search, setSearch] = useState(false);
  const [quick, setQuick] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setCart(false);
    setSearch(false);
    setQuick(null);
    const title = location.pathname.split("/")[1];
    document.title = title
      ? `${title[0].toUpperCase() + title.slice(1)} — CozyNest`
      : "CozyNest — Handcrafted Fashion & Timeless Decor";
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header onCart={() => setCart(true)} onSearch={() => setSearch(true)} />
      <main id="main" tabIndex="-1" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home onQuickView={setQuick} />} />
          <Route path="/shop" element={<Shop onQuickView={setQuick} />} />
          <Route
            path="/product/:id"
            element={<Product onQuickView={setQuick} />}
          />
          <Route
            path="/cart"
            element={
              <section className="section cart-page">
                <p className="eyebrow">YOUR HANDPICKED FINDS</p>
                <h1>Your cart</h1>
                <div className="cart-page-content">
                  <CartContents />
                </div>
              </section>
            }
          />
          <Route
            path="/wishlist"
            element={<Wishlist onQuickView={setQuick} />}
          />
          <Route path="/login" element={<Auth key="login" />} />
          <Route path="/register" element={<Auth key="register" register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Account orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:id" element={<Article />} />
          {["about", "contact", "shipping", "privacy", "terms"].map((type) => (
            <Route
              key={type}
              path={`/${type}`}
              element={<Information type={type} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton floating />
      {cart && <CartDrawer onClose={() => setCart(false)} />}{" "}
      {search && <SearchBar onClose={() => setSearch(false)} />}{" "}
      {quick && (
        <Modal
          title="A closer look"
          onClose={() => setQuick(null)}
          className="quick-modal"
        >
          <ProductDetails key={quick.id} product={quick} quick />
        </Modal>
      )}
    </>
  );
}
