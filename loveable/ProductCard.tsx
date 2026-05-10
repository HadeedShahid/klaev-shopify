import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/shop/$productId" params={{ productId: product.id }} className="group block">
      <div className="relative overflow-hidden bg-bone">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="text-eyebrow absolute left-4 top-4 bg-background px-2 py-1">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="text-eyebrow w-full bg-ink py-3 text-background">
            Quick add
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((c) => (
              <span key={c} className="text-[10px] text-muted-foreground">{c}{c !== product.colors[product.colors.length - 1] && " ·"}</span>
            ))}
          </div>
        </div>
        <p className="text-sm tabular-nums">€{product.price}</p>
      </div>
    </Link>
  );
}
