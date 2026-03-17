import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Browse by category
      </h2>
      <p className="text-slate-500 mb-8">
        Find exactly what you need for your next project or adventure.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/browse?category=${cat.id}`}
            className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
          >
            <span className="text-3xl mb-3 block">{cat.icon}</span>
            <h3 className="font-semibold text-slate-900 group-hover:text-brand transition-colors">
              {cat.name}
            </h3>
            <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
            <p className="text-xs text-slate-400 mt-2">
              {cat.itemCount} items
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
