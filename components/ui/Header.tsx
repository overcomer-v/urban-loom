import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { getCategories } from "@/lib/categories";
import { Categories } from "@/types/Categories";

export default function Header() {
  return (
    <header className="bg-offwhite py-6 border-b border-neutral-300">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={"/homepage_decorations/urban-loom-icon.png"}
              alt=""
              width={30}
              height={30}
            />
          </Link>
          <Link href="/" className="font-heading font-bold text-xl">
            URBAN LOOM
          </Link>
        </div>

        <div className="flex items-center gap-8 text-xs font-semibold">
          <Link href="/">HOME</Link>
          <Categories />
          <Link href="/about">ABOUT US</Link>
          <Link href="/contact">CONTACT US</Link>
        </div>

        <Link href={"/product-query"}>
          <Search className="h-10 w-10 p-2 rounded-full hover:bg-neutral-300" />
        </Link>
      </Container>
    </header>
  );
}

async function Categories() {
  const categories: Categories[] = await getCategories();

  return (
    <div className="relative inline-block group">
      <div className="flex items-center gap-1 cursor-pointer">
        <Link href="/categories">CATEGORIES</Link>
        <ChevronDown size={15} />
      </div>

      <div className="absolute left-0 top-full z-1000 hidden pt-2 group-hover:block">
        <div className="min-w-40 rounded bg-white py-6 shadow-md uppercase text-[0.75rem] space-y-2 [&_a]:block [&_a]:opacity-90">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${item.id}?name=${item.category}`}
              className="rounded px-10 py-3 hover:bg-neutral-200 transition-colors"
            >
              {item.category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
