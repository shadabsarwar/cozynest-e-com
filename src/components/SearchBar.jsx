import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { money } from "../config/store";
import Modal from "./Modal";
export const matchesSearch = (p, query) =>
  `${p.name} ${p.category} ${p.description}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());
export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const results = products.filter((p) => matchesSearch(p, query));
  return (
    <Modal
      title="Find your next favorite"
      onClose={onClose}
      className="search-modal"
    >
      <label className="search-field">
        Search the collection
        <input
          type="search"
          placeholder="Try candles, a cozy knit, a little something…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <p className="muted small">
        {query
          ? `${results.length} pieces found`
          : "A few things you might love"}
      </p>
      <div className="search-results">
        {results.slice(0, query ? 21 : 4).map((p) => (
          <Link to={`/product/${p.id}`} onClick={onClose} key={p.id}>
            <img src={p.image} alt={p.name} width="64" height="80" />
            <span>
              <strong>{p.name}</strong>
              <small>{p.category}</small>
            </span>
            <span>{money(p.price)}</span>
          </Link>
        ))}
      </div>
      {!results.length && (
        <p className="empty-state">
          No pieces found for “{query}”. Try another name or category.
        </p>
      )}
      <Link
        className="text-link"
        to={`/shop?q=${encodeURIComponent(query)}`}
        onClick={onClose}
      >
        Explore all results →
      </Link>
    </Modal>
  );
}
