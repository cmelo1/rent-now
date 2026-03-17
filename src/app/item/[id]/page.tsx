"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { items } from "@/data/items";
import { categories } from "@/data/categories";
import RentalConfigurator from "@/components/item/RentalConfigurator";
import { useState } from "react";

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = items.find((i) => i.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!item) {
    notFound();
  }

  const category = categories.find((c) => c.id === item.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/browse" className="hover:text-slate-600 transition-colors">
          Browse
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/browse?category=${category.id}`}
              className="hover:text-slate-600 transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-600">{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Images & Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Main image */}
          <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden">
            <img
              src={item.images[selectedImage]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail strip */}
          {item.images.length > 1 && (
            <div className="flex gap-3">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i
                      ? "border-brand"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${item.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Details */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                {item.name}
              </h1>
              {!item.available && (
                <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  Unavailable
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">&#9733;</span>
                <span className="font-medium text-slate-700">
                  {item.rating}
                </span>
                <span>({item.reviewCount} reviews)</span>
              </div>
              <span>|</span>
              <span>{item.location}</span>
              <span>|</span>
              <span>By {item.owner}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Specs */}
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Specifications
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(item.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-slate-50 rounded-lg px-4 py-3"
                >
                  <dt className="text-xs text-slate-400 font-medium">{key}</dt>
                  <dd className="text-sm text-slate-900 font-medium mt-0.5">
                    {value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Rental Configurator */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <RentalConfigurator item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
