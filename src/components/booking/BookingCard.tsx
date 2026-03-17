import Link from "next/link";
import { Booking } from "@/lib/types";
import { items } from "@/data/items";
import { formatCurrency, formatDate } from "@/lib/pricing";

const statusConfig: Record<
  Booking["status"],
  { label: string; classes: string }
> = {
  pending: {
    label: "Pending",
    classes: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  active: {
    label: "Active",
    classes: "bg-green-50 text-green-700 border-green-200",
  },
  completed: {
    label: "Completed",
    classes: "bg-slate-50 text-slate-600 border-slate-200",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-50 text-red-600 border-red-200",
  },
};

export default function BookingCard({ booking }: { booking: Booking }) {
  const item = items.find((i) => i.id === booking.itemId);
  const status = statusConfig[booking.status];

  return (
    <Link
      href={`/item/${booking.itemId}`}
      className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
    >
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
        {item && (
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 truncate">
            {item?.name ?? "Unknown Item"}
          </h3>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${status.classes}`}
          >
            {status.label}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-1">
          {formatDate(booking.startDate)} &mdash; {formatDate(booking.endDate)}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-slate-400 capitalize">
            {booking.billingMode}
          </span>
          <span className="text-sm font-semibold text-slate-900">
            {formatCurrency(booking.totalCost)}
          </span>
        </div>
      </div>
    </Link>
  );
}
