"use client";

import { categories } from "@/data/categories";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableOnly: boolean;
  onAvailableChange: (available: boolean) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
}

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  availableOnly,
  onAvailableChange,
  maxPrice,
  onMaxPriceChange,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === ""
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Max Daily Rate: ${maxPrice}
        </h3>
        <input
          type="range"
          min={5}
          max={100}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>$5</span>
          <span>$100</span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => onAvailableChange(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand"
          />
          <span className="text-sm text-slate-700">Available only</span>
        </label>
      </div>
    </div>
  );
}
