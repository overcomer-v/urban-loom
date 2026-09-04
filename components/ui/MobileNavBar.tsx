import { Categories } from "@/types/Categories";
import { Menu, User2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoriesSec } from "./CategoriesSec";
import Image from "next/image";
import { User } from "@/types/User";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

export default function MobileNav({ isOpen, onClose, user }: MobileNavProps) {
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
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Nav */}
      <aside
        className={`fixed top-0 left-0 z-100 h-full w-80 bg-white
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col px-8 py-8 gap-6`}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3 ">
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
              className="font-heading font-bold md:text-xl text-2xl"
            >
              URBAN LOOM
            </Link>
          </div>

          <button onClick={onClose}>
            <X className="opacity-40" size={24} />
          </button>
        </div>

        <Link
          href="/"
          onClick={() => {
            onClose();
          }}
        >
          HOME
        </Link>
        <CategoriesSec
          categories={categories}
          loading={loading}
          onItemsClick={onClose}
        />

        <Link href="/about">ABOUT US</Link>
        <Link href="/contact">CONTACT US</Link>
        {user ? (
          <div className="flex items-center gap-2">
            <User2 className="bg-black text-white h-8 w-8 p-1 rounded-full" />
            <span className="font-semibold text-wrap">{user.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button className="bg-neutral-300 px-5 py-2 text-xs rounded-4xl text-nowrap">
              Log In
            </button>

            <Link
              href="/signup"
              onClick={() => {
                onClose();
              }}
              className="bg-black text-white px-5 py-2 text-xs rounded-4xl text-nowrap"
            >
              Sign Up
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
