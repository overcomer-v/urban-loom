"use client";

import {
  ChevronDown,
  Menu,
  Search,
  User2,
} from "lucide-react";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Categories } from "@/types/Categories";
import { User } from "@/types/User";
import { CategoriesSec } from "./CategoriesSec";

export default function Header({
  user,
  onMenuClick,
}: {
  user: User;
  onMenuClick: () => void;
}) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);


  return (
    <header className="bg-offwhite py-4 border-b border-neutral-300">
      <Container className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Menu className="md:hidden" onClick={onMenuClick} />

          <Link href="/">
            <Image
              src="/homepage_decorations/urban-loom-icon.png"
              alt=""
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/"
            className="font-heading font-bold md:text-xl text-sm"
          >
            URBAN LOOM
          </Link>
        </div>

        <div className="items-center gap-8 text-xs font-semibold hidden md:flex">
          <Link href="/">HOME</Link>
          <CategoriesSec
            categories={categories}
            loading={loading}
          />

          <Link href="/about">ABOUT US</Link>
          <Link href="/contact">CONTACT US</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/product-query">
            <Search className="h-10 w-10 p-2 rounded-full hover:bg-neutral-300" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <User2 className="bg-black text-white h-8 w-8 p-1 rounded-full" />
              <span className="font-semibold text-wrap">
                {user.name}
              </span>
            </div>
          ) : (
            <div className="hidden md:flex">
              <button className="bg-neutral-300 px-5 py-2 text-xs rounded-4xl text-nowrap">
                Log In
              </button>

              <Link
                href="/signup"
                className="bg-black text-white px-5 py-2 text-xs rounded-4xl text-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </Container>
    </header>
  );
}

