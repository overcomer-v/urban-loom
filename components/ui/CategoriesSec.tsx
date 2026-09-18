import { Categories } from "@/types/Categories";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CategoriesSec({
  categories,
  loading,
  onItemsClick,
  mobile = false,
}: {
  categories: Categories[];
  loading: boolean;
  onItemsClick?: () => void;
  mobile?: boolean;
}) {
  /*
   * Mobile version
   */
  if (mobile) {
    return (
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse bg-black/5" />
            <div className="h-4 w-20 animate-pulse bg-black/5" />
            <div className="h-4 w-28 animate-pulse bg-black/5" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-xs text-black/40">
            No categories available.
          </p>
        ) : (
          categories.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${item.id}?name=${encodeURIComponent(
                item.category
              )}`}
              onClick={onItemsClick}
                className="group flex items-center justify-between rounded-sm px-3 py-2"

            >
              <span className="text-sm font-medium">
                {item.category}
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.7}
                className="text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-black/60"
              />
            </Link>
          ))
        )}
      </div>
    );
  }

  /*
   * Desktop version
   */
  return (
    <div className="relative inline-block group">
      <div className="flex items-center gap-1">
        <Link
          href="/categories"
          className="transition-colors hover:text-black/45"
        >
          CATEGORIES
        </Link>

        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </div>

      <div className="absolute left-0 top-full z-50 hidden pt-3 group-hover:block">
        <div className="min-w-48 overflow-hidden rounded-md border border-black/5 bg-white py-2 shadow-lg">
          {loading ? (
            <span className="block px-6 py-4 text-xs text-black/40">
              Loading...
            </span>
          ) : categories.length === 0 ? (
            <span className="block px-6 py-4 text-xs text-black/40">
              No categories available.
            </span>
          ) : (
            categories.map((item) => (
              <Link
                key={item.id}
                href={`/categories/${item.id}?name=${encodeURIComponent(
                  item.category
                )}`}
                onClick={onItemsClick}
                className="block px-6 py-3 text-[11px] uppercase tracking-wide transition-colors hover:bg-black/5"
              >
                {item.category}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
