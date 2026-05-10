import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Monolith" },
      { name: "description", content: "Browse the full Monolith collection. Footwear, knitwear, trousers and apparel." },
      { property: "og:title", content: "Shop — Monolith" },
    ],
  }),
  component: Shop,
});

const categories = ["All", "Footwear", "Knitwear", "Trousers", "Apparel"];

function Shop() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  // pad list for visual density
  const grid = [...filtered, ...filtered, ...filtered].slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Listing header */}
      <section className="border-b border-border px-6 py-16 lg:px-10 lg:py-20">
        <p className="text-eyebrow text-muted-foreground">Collection / SS·26</p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">
            All objects<span className="italic font-light"> — index.</span>
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            {filtered.length * 4} pieces in current rotation. Sorted by intent.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[65px] z-40 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-6 py-4 backdrop-blur lg:px-10">
        <div className="flex items-center gap-1 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-eyebrow shrink-0 px-4 py-2 transition-colors ${
                active === c ? "bg-ink text-background" : "hover:bg-bone"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-eyebrow hidden items-center gap-2 md:inline-flex">
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} /> Filter
          </button>
          <button className="text-eyebrow inline-flex items-center gap-2">
            Sort: Featured <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <section className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {grid.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className={i === 4 ? "md:col-span-2 md:row-span-1" : ""}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-border pt-10">
          <p className="text-eyebrow text-muted-foreground">12 of {filtered.length * 4}</p>
          <button className="text-eyebrow border border-ink px-8 py-4 hover:bg-ink hover:text-background transition-colors">
            Load more
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
