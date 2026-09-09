import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth, useCart } from "../hooks/StoreProvider";
import Icon from "./Icon";
import Modal from "./Modal";
const links = [
  ["Shop", "/shop"],
  ["Collections", "/#collections"],
  ["New arrivals", "/shop?new=true"],
  ["About", "/about"],
  ["Journal", "/journal"],
];
export default function Header({ onCart, onSearch }) {
  const [menu, setMenu] = useState(false);
  const [account, setAccount] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { getCartCount } = useCart();
  useEffect(() => {
    setMenu(false);
    setAccount(false);
  }, [location]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return (
    <>
      <div className="announcement">
        Thoughtfully made. Lovingly chosen.{" "}
        <span>A little everyday extraordinary.</span>
      </div>
      <header className={scrolled ? "header scrolled" : "header"}>
        <div className="header-inner">
          <Link to="/" className="wordmark" aria-label="CozyNest home">
            CozyNest<span>®</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, to]) => (
              <NavLink key={label} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search products"
              onClick={onSearch}
            >
              <Icon name="search" />
            </button>
            <Link
              className="icon-button desktop-action"
              to="/wishlist"
              aria-label="Wishlist"
            >
              <Icon name="heart" />
            </Link>
            <div className="account-wrap desktop-action">
              <button
                className="icon-button"
                aria-label="Account menu"
                aria-expanded={account}
                onClick={() => setAccount((v) => !v)}
              >
                <Icon name="user" />
              </button>
              {account && (
                <>
                  <button
                    className="dropdown-backdrop"
                    aria-label="Close account menu"
                    onClick={() => setAccount(false)}
                  />
                  <div
                    className="account-dropdown"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setAccount(false);
                    }}
                  >
                    {currentUser ? (
                      <>
                        <p>Hello, {currentUser.firstName}</p>
                        <Link to="/account">My account</Link>
                        <Link to="/orders">Orders</Link>
                        <Link to="/wishlist">Wishlist</Link>
                        <button
                          onClick={() => {
                            logout();
                            setAccount(false);
                          }}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Create account</Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <button
              className="icon-button cart-trigger"
              aria-label={`Open cart, ${getCartCount()} items`}
              onClick={onCart}
            >
              <Icon name="bag" />
              {getCartCount() > 0 && (
                <span className="cart-count">{getCartCount()}</span>
              )}
            </button>
            <button
              className="icon-button mobile-menu-button"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <Modal title="CozyNest" onClose={() => setMenu(false)} drawer>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link to="/">Home</Link>
            {links.map(([label, to]) => (
              <Link key={label} to={to}>
                {label}
                <Icon name="arrow" />
              </Link>
            ))}
            <Link to={currentUser ? "/account" : "/login"}>Account</Link>
            <Link to="/wishlist">Wishlist</Link>
          </nav>
          <p className="drawer-note">
            Pieces with a story.
            <br />
            Made for your everyday.
          </p>
        </Modal>
      )}
    </>
  );
}
