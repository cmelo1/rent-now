"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { items } from "@/data/items";
import { categories } from "@/data/categories";
import ItemCard from "@/components/browse/ItemCard";
import SearchBar from "@/components/browse/SearchBar";
import FilterSidebar from "@/components/browse/FilterSidebar";
import SortDropdown from "@/components/browse/SortDropdown";

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400">
          Loading...
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("rating");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  const updateUrl = (cat: string, q: string) => {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (q) params.set("q", q);
    router.replace(`/browse?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    updateUrl(cat, query);
  };

  const handleQueryChange = (q: string) => {
    setQuery(q);
    updateUrl(category, q);
  };

  const filtered = useMemo(() => {
    let result = [...items];

    if (query) {
      const lower = query.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower)
      );
    }

    if (category) {
      result = result.filter((item) => item.category === category);
    }

    if (availableOnly) {
      result = result.filter((item) => item.available);
    }

    result = result.filter((item) => item.dailyRate <= maxPrice);

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case "price-high":
        result.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [query, category, sort, availableOnly, maxPrice]);

  const categoryName = category
    ? categories.find((c) => c.id === category)?.name
    : "All Items";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{categoryName}</h1>
        <p className="text-slate-500 mt-1">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <SearchBar value={query} onChange={handleQueryChange} />
        </div>
        <SortDropdown value={sort} onChange={setSort} />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-full lg:w-64 shrink-0`}
        >
          <div className="lg:sticky lg:top-24 bg-white border border-slate-200 rounded-xl p-5">
            <FilterSidebar
              selectedCategory={category}
              onCategoryChange={handleCategoryChange}
              availableOnly={availableOnly}
              onAvailableChange={setAvailableOnly}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
            />
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-semibold text-slate-900">
                No items found
              </h3>
              <p className="text-slate-500 mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
