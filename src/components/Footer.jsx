import { Link } from "react-router-dom";
import { store } from "../config/store";
import { useToast } from "../hooks/StoreProvider";
export default function Footer() {
  const notify = useToast();
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark" to="/">
            {store.name}
            <span>®</span>
          </Link>
          <p>
            Handcrafted finds. Timeless favorites.
            <br />A little more soul in your everyday.
          </p>
          <div className="social-links">
            {Object.entries(store.socialLinks).map(([name, url]) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </a>
              ) : (
                <button
                  key={name}
                  onClick={() => notify(`${name} is not connected yet.`)}
                >
                  {name}
                </button>
              ),
            )}
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/shop">Shop all</Link>
          <Link to="/shop?new=true">New arrivals</Link>
          <Link to="/shop?sale=true">The considered sale</Link>
          <Link to="/wishlist">Your wishlist</Link>
        </div>
        <div>
          <h3>Here to help</h3>
          <Link to="/contact">Contact us</Link>
          <Link to="/shipping">Shipping & returns</Link>
          <Link to="/account">Your account</Link>
          <Link to="/orders">Your orders</Link>
        </div>
        <div>
          <h3>Our world</h3>
          <Link to="/about">Our story</Link>
          <Link to="/journal">The journal</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {store.name}. Made for the everyday.
        </span>
        <span>Thoughtfully curated. Always.</span>
      </div>
    </footer>
  );
}
