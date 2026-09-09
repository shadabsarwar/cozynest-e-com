import { Link, useParams } from "react-router-dom";
import { useAuth, useCart } from "../hooks/StoreProvider";
import { articles } from "../data/journal";
import { asset } from "../data/products";
import { money } from "../config/store";
import WhatsAppButton from "../components/WhatsAppButton";
import { EmptyState } from "../components/CartDrawer";
import { JournalSection } from "./Home";
export function NotFound() {
  return (
    <section className="section">
      <EmptyState
        title="Oops — this page wandered off."
        text="A new favorite is just around the corner."
      />
      <Link className="text-link centered" to="/">
        Back to home →
      </Link>
    </section>
  );
}
export function Journal() {
  return (
    <>
      <div className="page-heading section">
        <p className="eyebrow">THOUGHTFUL LIVING</p>
        <h1>Stories for a slower everyday.</h1>
        <p>Little ideas. Fresh perspectives. Room to be inspired.</p>
      </div>
      <JournalSection />
    </>
  );
}
export function Article() {
  const { id } = useParams();
  const a = articles.find((x) => x.id === id);
  if (!a) return <NotFound />;
  return (
    <article className="article section">
      <Link className="text-link" to="/journal">
        ← The journal
      </Link>
      <p className="eyebrow">
        {a.category} · {a.date}
      </p>
      <h1>{a.title}</h1>
      <p className="article-intro">{a.intro}</p>
      <img src={a.image} alt={a.title} width="1000" height="600" />
      {a.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <Link className="button" to="/shop">
        Explore the collection →
      </Link>
    </article>
  );
}
export function Account({ orders = false }) {
  const { currentUser, logout } = useAuth();
  return (
    <section className="section account-page">
      <p className="eyebrow">YOUR COZYNEST</p>
      <h1>
        {orders
          ? "Your orders"
          : currentUser
            ? `Hello, ${currentUser.firstName}.`
            : "Make yourself at home."}
      </h1>
      {currentUser ? (
        <>
          <p className="muted">{currentUser.email}</p>
          <p>
            {orders
              ? "No orders yet. Checkout is a preview and does not place real orders."
              : "This is your local demo profile. Your favorite pieces are saved on this device."}
          </p>
          <div className="button-row">
            <Link className="button" to="/wishlist">
              Your wishlist
            </Link>
            <Link className="button outline" to="/shop">
              Explore the collection
            </Link>
            <button className="text-link" onClick={logout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Sign in to explore the demo account experience.</p>
          <Link className="button" to="/login">
            Login
          </Link>
        </>
      )}
    </section>
  );
}
export function Checkout() {
  const { items, getCartTotal } = useCart();
  return (
    <section className="section checkout-page">
      <p className="eyebrow">ONE STEP CLOSER</p>
      <h1>Your lovely finds.</h1>
      {!items.length ? (
        <EmptyState title="Your cart is feeling a little empty." />
      ) : (
        <div className="checkout-grid">
          <div>
            <h2>Checkout preview</h2>
            <p>
              Online checkout is not available yet. No payment will be collected
              and no order will be placed.
            </p>
            <p>
              You can inquire about these pieces on WhatsApp once the store
              connects its number.
            </p>
            <WhatsAppButton />
            <Link className="text-link" to="/cart">
              ← Back to your cart
            </Link>
          </div>
          <div className="checkout-summary">
            <h2>Order summary</h2>
            {items.map((p) => (
              <div key={p.id}>
                <span>
                  {p.name} × {p.quantity}
                </span>
                <strong>{money(p.price * p.quantity)}</strong>
              </div>
            ))}
            <div>
              <span>Subtotal</span>
              <strong>{money(getCartTotal())}</strong>
            </div>
            <p>Shipping and taxes are not yet calculated.</p>
          </div>
        </div>
      )}
    </section>
  );
}
const information = {
  about: [
    "A little more soul in your everyday.",
    "CozyNest brings together handcrafted fashion, vintage-inspired decor, and thoughtful accessories. We believe the best pieces are the ones you reach for, live with, and love over time.",
    "Our collection celebrates warm textures, playful details, and timeless shapes. Explore at your own pace and find something that feels like you.",
  ],
  contact: [
    "Let’s find your lovely.",
    "Have a question about a piece? We would love to help with product details, care, and availability.",
    "Our store contact channel is being set up. WhatsApp will become available as soon as the store connects its number.",
  ],
  shipping: [
    "The details, thoughtfully handled.",
    "Shipping rates, delivery areas, and delivery estimates have not been configured. Please confirm them with the store before ordering.",
    "Return eligibility and timeframes will be confirmed by the store. No orders can be placed through this preview.",
  ],
  privacy: [
    "Your privacy, simply put.",
    "This demo stores your cart, wishlist, and optional demo profile in your browser. Newsletter signup saves an email on this device only. Passwords are not stored or sent.",
    "You can remove this data by clearing site data in your browser. Connected services and a complete store privacy policy must be added before launch.",
  ],
  terms: [
    "A few things to know.",
    "This storefront is a demonstration. Product prices and content are a preview of the collection, and checkout does not process payments or create orders.",
    "A complete store policy covering purchases, shipping, returns, and applicable terms must be provided before online sales begin.",
  ],
};
export default function Information({ type }) {
  const [title, ...paragraphs] = information[type];
  return (
    <section
      className={`section info-page ${type === "about" ? "about-page" : ""}`}
    >
      <div>
        <p className="eyebrow">
          {type === "about" ? "THE COZYNEST STORY" : type.toUpperCase()}
        </p>
        <h1>{title}</h1>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {type === "contact" ? (
          <WhatsAppButton />
        ) : (
          <Link className="button" to="/shop">
            Explore the collection →
          </Link>
        )}
      </div>
      {type === "about" && (
        <img
          src={asset("grid-1.jpg")}
          alt="A cozy room filled with thoughtful details"
          width="650"
          height="700"
        />
      )}
    </section>
  );
}
