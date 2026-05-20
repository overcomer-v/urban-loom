import { ChevronDown, Search, User2, UserCircle, UserIcon } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { getCategories } from "@/lib/categories";
import { Categories } from "@/types/Categories";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/User";

export default function Header({ user }: { user: User }) {
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
          <CategoriesSec />
          <Link href="/about">ABOUT US</Link>
          <Link href="/contact">CONTACT US</Link>
        </div>

        <div className="flex items-center gap-4">
          {" "}
          <Link href={"/product-query"}>
            <Search className="h-10 w-10 p-2 rounded-full hover:bg-neutral-300" />
          </Link>
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <User2 className="bg-black text-white h-8 w-8 p-1 rounded-full" />
                <span className="font-semibold text-wrap">{user.name}</span>
              </div>
            </>
          ) : (
            <>
              <button className="bg-neutral-300 px-6 py-3 rounded-4xl">
                Log In
              </button>
              <Link href={"/signup"} className="bg-black text-white px-6 py-3 rounded-4xl">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}

async function CategoriesSec() {
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
