import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-6">🔍</p>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">
        Page not found
      </h1>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/browse"
          className="border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
        >
          Browse Items
        </Link>
      </div>
    </div>
  );
}
