"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-brand"
    >
      <option value="rating">Top Rated</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name">Name: A-Z</option>
    </select>
  );
}
