import { Link } from "react-router-dom";
import { asset, products } from "../data/products";
import { categories } from "../data/categories";
import { articles } from "../data/journal";
import { ProductGrid } from "../components/ProductCard";
import Icon from "../components/Icon";
import Newsletter from "../components/Newsletter";
export function JournalSection() {
  return (
    <section className="section" id="journal">
      <div className="section-heading">
        <div>
          <p className="eyebrow">NOTES FROM OUR WORLD</p>
          <h2>The CozyNest journal</h2>
        </div>
        <Link className="text-link" to="/journal">
          A little inspiration <Icon name="arrow" />
        </Link>
      </div>
      <div className="journal-grid">
        {articles.map((a) => (
          <article key={a.id}>
            <Link to={`/journal/${a.id}`} className="journal-image">
              <img
                src={a.image}
                alt={a.title}
                width="500"
                height="340"
                loading="lazy"
              />
            </Link>
            <p className="eyebrow">
              {a.category} <span>· {a.date}</span>
            </p>
            <h3>
              <Link to={`/journal/${a.id}`}>{a.title}</Link>
            </h3>
            <Link className="text-link" to={`/journal/${a.id}`}>
              Read the story <Icon name="arrow" size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export default function Home({ onQuickView }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">HANDCRAFTED · CURATED · TIMELESS</p>
          <h1>
            Pieces with
            <br />a story.
            <br />
            <em>Made for you.</em>
          </h1>
          <p>
            For the spaces you love and the life you live.
            <br className="desktop-action" /> Discover thoughtful finds with a
            little more soul.
          </p>
          <Link className="button" to="/shop">
            Shop the collection <Icon name="arrow" />
          </Link>
          <Link className="hero-secondary" to="/shop?new=true">
            Explore new arrivals <span>↗</span>
          </Link>
          <div className="hero-footnote">
            <span className="tiny-flower">✳</span>
            <span>
              Small details.
              <br />
              <strong>Extraordinary everyday.</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={asset("hero-banner.jpg")}
            alt="A warm candlelit living room with autumn leaves and a cozy reading chair"
            width="800"
            height="850"
            fetchPriority="high"
          />
          <span className="hero-image-label">THE ART OF FEELING AT HOME</span>
          <Link to="/shop?category=Candles" className="hero-image-card">
            <span>
              Set the mood
              <br />
              <strong>Little moments of warmth</strong>
            </span>
            <span className="round-arrow">
              <Icon name="arrow" />
            </span>
          </Link>
        </div>
        <span className="hero-edition">THE EVERYDAY COLLECTION — VOL. 01</span>
      </section>
      <div className="benefits">
        <span>
          <Icon name="leaf" /> Thoughtfully curated
        </span>
        <span>
          <Icon name="heart" /> Made with a little more love
        </span>
        <span>
          <Icon name="gift" /> Finds worth giving
        </span>
        <span>
          <Icon name="bag" /> Timeless, never ordinary
        </span>
      </div>
      <section className="section" id="collections">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR KIND OF LOVELY</p>
            <h2>A world of little wonders</h2>
          </div>
          <p>
            For your wardrobe. For your home.
            <br />
            For the joy of finding something special.
          </p>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              className="category-card"
              key={c.name}
              to={`/shop?category=${c.name}`}
            >
              <div className="category-image">
                <img
                  src={c.image}
                  alt={c.name}
                  width="350"
                  height="420"
                  loading="lazy"
                />
                <span className="category-number">0{i + 1}</span>
              </div>
              <h3>
                {c.name}
                <Icon name="arrow" />
              </h3>
              <p>{c.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GOOD THINGS, HANDPICKED</p>
            <h2>Your next favorite thing</h2>
          </div>
          <Link className="text-link" to="/shop">
            Explore all pieces <Icon name="arrow" />
          </Link>
        </div>
        <ProductGrid
          products={products.filter((p) => p.featured)}
          onQuickView={onQuickView}
        />
      </section>
      <section className="story-panel">
        <img
          src={asset("grid-5.jpg")}
          alt="A sunlit autumn window with knitted blankets and candles"
          width="620"
          height="650"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">LESS ORDINARY. MORE YOU.</p>
          <h2>
            A home is made
            <br />
            of <em>little things.</em>
          </h2>
          <p>
            The soft knit you reach for. The candle you light at dusk. The bag
            that goes everywhere with you.
          </p>
          <p>
            We believe the things we surround ourselves with should mean
            something. So we bring together pieces with warmth, character, and a
            story to tell.
          </p>
          <Link className="text-link" to="/about">
            Get to know CozyNest <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FRESH FINDS, FAMILIAR FEELING</p>
            <h2>Just arrived. Already loved.</h2>
          </div>
          <Link className="text-link" to="/shop?new=true">
            Shop all new arrivals <Icon name="arrow" />
          </Link>
        </div>
        <ProductGrid
          products={products.filter((p) => p.newArrival).slice(4, 8)}
          onQuickView={onQuickView}
        />
      </section>
      <section className="promo-grid section">
        <div className="promo">
          <img
            src={asset("off-1.jpg")}
            alt="A sculptural vase filled with golden flowers"
            width="680"
            height="380"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">THE CONSIDERED SALE</p>
            <h2>
              Lovely finds.
              <br />
              Even lovelier prices.
            </h2>
            <Link className="text-link" to="/shop?sale=true">
              Shop selected pieces <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="promo">
          <img
            src={asset("cta-bg.png")}
            alt="Cream knitwear and warm-toned accessories"
            width="680"
            height="380"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">LAYERS TO LIVE IN</p>
            <h2>
              Your new
              <br />
              comfort zone.
            </h2>
            <Link className="text-link" to="/shop?category=Clothing">
              Explore the collection <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="testimonials section">
        <p className="eyebrow">A LITTLE LOVE FROM OUR COMMUNITY</p>
        <h2>Found here. Loved everywhere.</h2>
        <div className="testimonial-grid">
          {[
            [
              "Emily T.",
              "avatar-1.png",
              "This scarf instantly became my go-to for chilly mornings. The red tartan is so rich and classic. Soft, warm, and full of quiet charm.",
              "Red Tartan Cashmere Scarf",
              "red-scarf",
            ],
            [
              "Hannah K.",
              "avatar-2.png",
              "The black tartan has that perfect balance of minimal and vintage. It feels luxurious without trying too hard.",
              "Black Tartan Cashmere Scarf",
              "black-scarf",
            ],
            [
              "Ethan V.",
              "avatar-3.png",
              "The frosted glass looks great on my shelf, and the soft glow is perfect for relaxing. The scent is subtle and calming.",
              "Frosted Glass Scented Candles",
              "frosted-glass-candles",
            ],
          ].map(([name, avatar, quote, product, id]) => (
            <figure key={name}>
              <div className="stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>“{quote}”</blockquote>
              <figcaption>
                <img
                  src={asset(avatar)}
                  width="44"
                  height="44"
                  alt={name}
                  loading="lazy"
                />
                <div>
                  <strong>{name}</strong>
                  <Link to={`/product/${id}`}>{product}</Link>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <JournalSection />
      <Newsletter />
    </>
  );
}
