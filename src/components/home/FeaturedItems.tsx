import Link from "next/link";
import { items } from "@/data/items";
import { formatCurrency } from "@/lib/pricing";
import ItemCard from "@/components/browse/ItemCard";

export default function FeaturedItems() {
  const featured = items.filter((i) => i.available && i.rating >= 4.7).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Top rated</h2>
          <p className="text-slate-500 mt-1">
            Most popular items from our community
          </p>
        </div>
        <Link
          href="/browse"
          className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
