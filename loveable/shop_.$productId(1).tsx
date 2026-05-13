import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, products } from "@/lib/products";
import { Minus, Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/shop_/$productId")({
  head: ({ params }) => {
    const p = getProduct(params.productId);
    const title = p ? `${p.name} — Monolith` : "Product — Monolith";
    const desc = p?.description ?? "Considered footwear and apparel from Amsterdam.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="px-6 py-32 text-center lg:px-10">
        <p className="text-eyebrow text-muted-foreground">404</p>
        <h1 className="font-display mt-4 text-4xl">Product not found</h1>
        <Link to="/shop" className="text-eyebrow mt-8 inline-block hover-underline">
          Return to shop
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-6 py-32 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: import("@/lib/products").Product };
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const sizes = product.sizes ?? [];
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (sizes.length > 0 && !size) {
      toast("Select a size", { description: "Please choose a size before adding to cart." });
      return;
    }
    toast.success(`${product.name} added to cart`, {
      description: `${color}${size ? ` · Size ${size}` : ""} · Qty ${qty}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border px-6 py-4 lg:px-10">
        <div className="text-eyebrow flex items-center gap-2 text-muted-foreground">
          <Link to="/" className="hover-underline">Index</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <Link to="/shop" className="hover-underline">Shop</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Gallery */}
        <div className="bg-bone">
          <div className="sticky top-[65px]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-12 lg:px-16 lg:py-20">
          <div className="max-w-md">
            <p className="text-eyebrow text-muted-foreground">{product.category}</p>
            <h1 className="font-display mt-3 text-4xl leading-[1] md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg tabular-nums">€{product.price}</p>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Color */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <p className="text-eyebrow">Colour</p>
                <p className="text-eyebrow text-muted-foreground">{color}</p>
              </div>
              <div className="mt-3 flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`text-eyebrow border px-4 py-3 transition-colors ${
                      color === c
                        ? "border-ink bg-ink text-background"
                        : "border-border hover:border-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            {sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-eyebrow">Size</p>
                  <button className="text-eyebrow text-muted-foreground hover-underline">
                    Size guide
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`text-eyebrow border py-3 transition-colors ${
                        size === s
                          ? "border-ink bg-ink text-background"
                          : "border-border hover:border-ink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add */}
            <div className="mt-10 flex gap-3">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-4 hover:bg-bone"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-4 hover:bg-bone"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="text-eyebrow flex-1 bg-ink py-4 text-background transition-opacity hover:opacity-90"
              >
                Add to cart — €{product.price * qty}
              </button>
            </div>

            {/* Details */}
            {product.details && (
              <div className="mt-12 border-t border-border pt-8">
                <p className="text-eyebrow">Details</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {product.details.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
              <p>Free shipping over €150</p>
              <p>30-day returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-border px-6 py-16 lg:px-10 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl md:text-4xl">You may also like</h2>
          <Link to="/shop" className="text-eyebrow hover-underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 lg:gap-x-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
