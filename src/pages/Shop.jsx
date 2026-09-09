import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { ProductGrid } from "../components/ProductCard";
import { matchesSearch } from "../components/SearchBar";
import { money } from "../config/store";
export default function Shop({ onQuickView }) {
  const [params, setParams] = useSearchParams();
  const update = (key, value) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        value ? next.set(key, value) : next.delete(key);
        return next;
      },
      { replace: true },
    );
  const query = params.get("q") || "";
  const category = params.get("category") || "All";
  const max = Number(params.get("max") || 100);
  const sort = params.get("sort") || "featured";
  let results = products.filter(
    (p) =>
      matchesSearch(p, query) &&
      (category === "All" || p.category === category) &&
      p.price <= max &&
      (!params.has("new") || p.newArrival) &&
      (!params.has("sale") || p.oldPrice),
  );
  results.sort(({ price: a, ...x }, { price: b, ...y }) =>
    sort === "low"
      ? a - b
      : sort === "high"
        ? b - a
        : sort === "new"
          ? y.addedAt - x.addedAt
          : sort === "rating"
            ? (y.rating || 0) - (x.rating || 0)
            : Number(y.featured) - Number(x.featured),
  );
  return (
    <section className="section shop-page">
      <div className="page-heading">
        <p className="eyebrow">THE COZYNEST COLLECTION</p>
        <h1>
          {params.has("sale")
            ? "The considered sale"
            : params.has("new")
              ? "Fresh finds, just for you."
              : "Find something that feels like you."}
        </h1>
        <p>
          Thoughtful pieces for your wardrobe, your home, and your everyday.
        </p>
      </div>
      <div className="shop-toolbar">
        <label>
          Search pieces
          <input
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => update("q", e.target.value)}
          />
        </label>
        <label className="price-filter">
          Up to {money(max)}
          <input
            type="range"
            min="0"
            max="100"
            value={max}
            onChange={(e) => update("max", e.target.value)}
          />
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(e) => update("sort", e.target.value)}>
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>
      <div className="category-filters" aria-label="Filter by category">
        {["All", ...categories.map((c) => c.name)].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            className={category === c ? "active" : ""}
            onClick={() => update("category", c === "All" ? "" : c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="result-count">
        <p>{results.length} products</p>
        <button className="text-link" onClick={() => setParams({})}>
          Reset filters
        </button>
      </div>
      {results.length ? (
        <ProductGrid products={results} onQuickView={onQuickView} />
      ) : (
        <div className="empty-state">
          <h2>No pieces found{query ? ` for “${query}”` : ""}.</h2>
          <p>Try another search or give your filters a little more room.</p>
          <button className="button" onClick={() => setParams({})}>
            Show all pieces
          </button>
        </div>
      )}
    </section>
  );
}
