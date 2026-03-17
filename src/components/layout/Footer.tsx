import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">
              RentNow
            </span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/browse" className="hover:text-slate-700 transition-colors">
              Browse
            </Link>
            <Link href="/account" className="hover:text-slate-700 transition-colors">
              My Rentals
            </Link>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} RentNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
