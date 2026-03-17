import Link from "next/link";
import { Item } from "@/lib/types";
import { formatCurrency } from "@/lib/pricing";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Link
      href={`/item/${item.id}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
              Unavailable
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 group-hover:text-brand transition-colors line-clamp-1">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-500 text-sm">&#9733;</span>
          <span className="text-sm text-slate-600">
            {item.rating} ({item.reviewCount})
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">{item.location}</p>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="font-bold text-slate-900">
            {formatCurrency(item.hourlyRate)}
          </span>
          <span className="text-xs text-slate-400">/hr</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-slate-900">
            {formatCurrency(item.dailyRate)}
          </span>
          <span className="text-xs text-slate-400">/day</span>
        </div>
      </div>
    </Link>
  );
}
