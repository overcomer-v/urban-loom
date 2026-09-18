"use client";

import { ArrowRight, ShoppingBag, User2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Categories } from "@/types/Categories";
import { User } from "@/types/User";
import { CategoriesSec } from "./CategoriesSec";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  cartCount: number;
};

export default function MobileNav({
  isOpen,
  onClose,
  user,
  cartCount,
}: MobileNavProps) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    if (!isOpen || categories.length > 0) return;

    async function fetchCategories() {
      try {
        setLoading(true);
        setCategoryError(false);

        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data.categories ?? []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [isOpen, categories.length]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed left-0 top-0 z-50 flex h-full w-[88vw] max-w-sm flex-col bg-white px-6 py-7 transition-transform duration-300 ease-out sm:px-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <Image
              src="/homepage_decorations/urban-loom-icon.png"
              alt="Urban Loom"
              width={30}
              height={30}
              className="rounded-md"
            />

            <span className="font-heading text-xl font-bold tracking-tight">
              URBAN LOOM
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5"
          >
            <X size={21} strokeWidth={1.8} className="text-black/65" />
          </button>
        </div>

        {/* Account */}
        <div className="mt-10 border-y border-black/10 py-6">
          {user ? (
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5">
                  <User2
                    className="text-black/50"
                    size={20}
                    strokeWidth={1.6}
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>

                  <p className="mt-0.5 truncate text-xs text-black/45">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/orders"
                onClick={onClose}
                className="group mt-5 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em]"
              >
                <span>MY ORDERS</span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Link
                href="/signin"
                onClick={onClose}
                className="text-[11px] font-semibold tracking-[0.16em] text-black/60 transition-colors hover:text-black"
              >
                LOG IN
              </Link>

              <Link
                href="/signup"
                onClick={onClose}
                className="group flex items-center gap-2 bg-black px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
              >
                SIGN UP
                <ArrowRight
                  size={14}
                  strokeWidth={1.7}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-9 flex flex-1 flex-col overflow-y-auto">
          {/* Home */}
          <Link
            href="/"
            onClick={onClose}
            className="font-heading text-2xl leading-none tracking-tight transition-colors hover:text-black/45"
          >
            Home
          </Link>

          {/* Shop */}
          <div className="mt-9">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
              Shop
            </p>

            {categoryError ? (
              <div className="flex items-center justify-between border border-black/10 px-4 py-3">
                <span className="text-xs text-black/50">
                  Unable to load categories
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setCategories([]);
                    setCategoryError(false);
                  }}
                  className="text-[10px] font-semibold tracking-[0.15em] underline underline-offset-4"
                >
                  RETRY
                </button>
              </div>
            ) : (
              <CategoriesSec
                categories={categories}
                loading={loading}
                onItemsClick={onClose}
                mobile
              />
            )}
          </div>

          {/* Secondary Links */}
          <div className="mt-9 flex flex-col gap-7">
            <Link
              href="/about"
              onClick={onClose}
              className="font-heading text-2xl leading-none tracking-tight transition-colors hover:text-black/45"
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              onClick={onClose}
              className="font-heading text-2xl leading-none tracking-tight transition-colors hover:text-black/45"
            >
              Contact
            </Link>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            onClick={onClose}
            className="group mt-10 flex items-center justify-between border-y border-black/10 py-5 px-2"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag
                size={19}
                strokeWidth={1.6}
                className="text-black/60"
              />

              <span className="text-[11px] font-semibold tracking-[0.18em]">
                CART
              </span>
            </div>

            <div className="flex items-center gap-3">
              {cartCount > 0 && (
                <span className="text-xs text-black/40">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}

              <ArrowRight
                size={16}
                strokeWidth={1.7}
                className="text-black/50 transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        </nav>

        {/* Footer */}
        <div className="border-t border-black/10 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium tracking-[0.25em] text-black/35">
              FASHION & LIFESTYLE
            </span>

            <span className="text-[9px] tracking-[0.2em] text-black/30">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
