"use client";

import { useMemo, useRef, useState } from "react";
import Link from "@/components/store-link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowRight, X } from "lucide-react";
import { products, categories, priceLabel, getSelectedVariant } from "@/lib/catalog";
import { ProductImage } from "./product-image";
import { ProductCard } from "./product-card";

export function ShopFromUrl() {
  const params = useSearchParams();
  const query = params.get("search") || "";
  const category = params.get("category") || "All";
  return <Shop key={`${query}|${category}`} initialQuery={query} initialCategory={category} />;
}

function highlightMatch(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0 || !query) return text;
  return <>{text.slice(0, index)}<mark>{text.slice(index, index + query.length)}</mark>{text.slice(index + query.length)}</>;
}

export function Shop({ initialQuery = "", initialCategory = "All" }: { initialQuery?: string; initialCategory?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [sort, setSort] = useState("Featured");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchInput = useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => products.filter(product =>
    (category === "All" || product.category === category) &&
    [product.name, product.category, ...product.tags].join(" ").toLowerCase().includes(normalizedQuery)
  ).sort((a, b) => sort === "Name A–Z" ? a.name.localeCompare(b.name)
    : sort === "Price low–high" ? a.variants[0].salePrice - b.variants[0].salePrice
    : sort === "Price high–low" ? b.variants[0].salePrice - a.variants[0].salePrice
    : Number(b.featured) - Number(a.featured)), [category, normalizedQuery, sort]);
  const suggestions = normalizedQuery ? products.filter(product =>
    [product.name, product.category, ...product.tags].join(" ").toLowerCase().includes(normalizedQuery)
  ).slice(0, 5) : [];

  return <>
    <div className="shop-search-wrap" onFocus={() => setSearchFocused(true)} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setSearchFocused(false);
        setActiveSuggestion(-1);
      }
    }}>
      <div className="shop-search">
        <Search size={21} aria-hidden="true" />
        <input ref={searchInput} role="combobox" aria-label="Search products" aria-autocomplete="list" aria-controls="product-search-suggestions" aria-describedby="search-keyboard-help" aria-expanded={searchFocused && suggestions.length > 0} aria-activedescendant={searchFocused && activeSuggestion >= 0 ? `search-result-${suggestions[activeSuggestion]?.id}` : undefined} placeholder="Search masalas, spices, or a dish…" value={query} onChange={event => {
          setQuery(event.target.value);
          setActiveSuggestion(-1);
          setSearchFocused(true);
        }} onKeyDown={event => {
          if ((event.key === "ArrowDown" || event.key === "ArrowUp") && suggestions.length) {
            event.preventDefault();
            setSearchFocused(true);
            setActiveSuggestion(index => event.key === "ArrowDown"
              ? (index + 1) % suggestions.length
              : index <= 0 ? suggestions.length - 1 : index - 1);
          } else if (event.key === "Escape") {
            setSearchFocused(false);
            setActiveSuggestion(-1);
          } else if (event.key === "Enter" && searchFocused && activeSuggestion >= 0) {
            event.preventDefault();
            const product = suggestions[activeSuggestion];
            if (product) router.push(`/products/${product.slug}`);
          }
        }} />
        {query && <button className="search-clear" type="button" aria-label="Clear search" title="Clear search" onMouseDown={event => event.preventDefault()} onClick={() => {
          setQuery("");
          setActiveSuggestion(-1);
          searchInput.current?.focus();
        }}><X size={18} aria-hidden="true" /></button>}
      </div>
      <span id="search-keyboard-help" className="sr-only">Use the up and down arrow keys to choose a result, Enter to open it, and Escape to close suggestions.</span>
      {searchFocused && suggestions.length > 0 && <div id="product-search-suggestions" className="search-suggestions" role="listbox" aria-label="Matching products">
        {suggestions.map((product, index) => {
          const variant = getSelectedVariant(product);
          return <Link id={`search-result-${product.id}`} role="option" aria-selected={activeSuggestion === index} key={product.id} href={`/products/${product.slug}`} onMouseDown={event => event.preventDefault()} onMouseEnter={() => setActiveSuggestion(index)} onFocus={() => setActiveSuggestion(index)}>
            <ProductImage src={product.image} alt={`${product.name} ${variant.weight}`} width={46} height={56} />
            <span className="search-suggestion-copy"><strong>{highlightMatch(product.name, normalizedQuery)}</strong><small>{product.variants.map(item => item.weight).join(" · ")}</small></span>
            <span className="search-suggestion-price">{product.variants.length > 1 ? "From " : ""}{priceLabel(variant.salePrice)}</span>
          </Link>;
        })}
      </div>}
    </div>
    <div className="shop-controls"><div className="chips">{["All", ...categories].map(item => <button type="button" aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item === "All" ? "All products" : item}</button>)}</div><label className="sort-label">Sort by <select aria-label="Sort products" value={sort} onChange={event => setSort(event.target.value)}>{["Featured", "Name A–Z", "Price low–high", "Price high–low"].map(item => <option key={item}>{item}</option>)}</select></label></div>
    <p className="results" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "masala" : "masalas"} for your kitchen</p>
    {filtered.length ? <div className="product-grid filter-results" key={`${query}|${category}|${sort}`}>{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty"><h2>We couldn’t find “{query.trim() || category}”.</h2><p>Try one of these popular blends:</p><div className="no-results-suggestions">{[["Biryani Masala", "biryani"], ["Garam Masala", "garam"], ["Chaat Masala", "chaat"]].map(([label, value]) => <button key={value} type="button" onClick={() => { setQuery(value); setCategory("All"); }}>{label}</button>)}</div><button className="button" onClick={() => { setQuery(""); setCategory("All"); }}>Show all products <ArrowRight size={18} /></button></div>}
  </>;
}
