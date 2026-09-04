import { Categories } from "@/types/Categories";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function CategoriesSec({
  categories,
  loading,
  onItemsClick,
}: {
  categories: Categories[];
  loading: boolean;
  onItemsClick?: () => void;
}) {
  return (
    <div className="relative inline-block group">
      <div className="flex items-center gap-1 cursor-pointer">
        <Link href="/categories">CATEGORIES</Link>
        <ChevronDown size={15} />
      </div>

      <div className="absolute left-0 top-full z-1000 hidden pt-2 group-hover:block">
        <div className="min-w-40 rounded bg-white py-6 shadow-md uppercase text-[0.75rem] space-y-2 [&_a]:block [&_a]:opacity-90">
          {loading ? (
            <span className="block px-10 py-3">Loading...</span>
          ) : (
            categories.map((item) => (
              <Link
                onClick={onItemsClick}
                key={item.id}
                href={`/categories/${item.id}?name=${item.category}`}
                className="rounded px-10 py-3 hover:bg-neutral-200 transition-colors"
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
