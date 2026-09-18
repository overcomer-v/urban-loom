"use client";

import {
  CircleUserRound,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "./Container";
import { CategoriesSec } from "./CategoriesSec";
import { Categories } from "@/types/Categories";
import { User } from "@/types/User";

type HeaderProps = {
  user: User | null;
  onMenuClick: () => void;
};

export default function Header({
  user,
  onMenuClick,
}: HeaderProps) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const accountRef = useRef<HTMLDivElement>(null);

  /*
   * Fetch categories
   */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.categories ?? []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  /*
   * Fetch cart count
   */
  useEffect(() => {
    async function fetchCartCount() {
      try {
        const response = await fetch("/api/cart/count");

        if (!response.ok) return;

        const data = await response.json();
        setCartCount(data.count ?? 0);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }

    fetchCartCount();

    window.addEventListener("cart-updated", fetchCartCount);

    return () => {
      window.removeEventListener("cart-updated", fetchCartCount);
    };
  }, []);

  /*
   * Close account dropdown when clicking outside
   */
  useEffect(() => {
    if (!showAccount) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setShowAccount(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [showAccount]);

  return (
    <header className="border-b border-black/10 bg-white">
      <Container className="flex h-[68px] items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <Menu size={21} strokeWidth={1.8} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Urban Loom home"
          >
            <Image
              src="/homepage_decorations/urban-loom-icon.png"
              alt=""
              width={30}
              height={30}
              className="rounded-md"
            />

            <span className="font-heading text-base font-bold tracking-tight sm:text-lg">
              URBAN LOOM
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-[11px] font-semibold tracking-[0.16em] transition-colors hover:text-black/45"
          >
            HOME
          </Link>

          <CategoriesSec
            categories={categories}
            loading={loading}
          />

          <Link
            href="/about"
            className="text-[11px] font-semibold tracking-[0.16em] transition-colors hover:text-black/45"
          >
            ABOUT US
          </Link>

          <Link
            href="/contact-us"
            className="text-[11px] font-semibold tracking-[0.16em] transition-colors hover:text-black/45"
          >
            CONTACT
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <Link
            href="/shop?mode=query"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5"
          >
            <Search
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          {/* Account */}
          {user ? (
            <div
              ref={accountRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setShowAccount((value) => !value)}
                aria-label="Open account menu"
                aria-expanded={showAccount}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              >
                <UserRound
                  size={21}
                  strokeWidth={1.8}
                />
              </button>

              <AccountOptions
                user={user}
                showDialog={showAccount}
                onClose={() => setShowAccount(false)}
              />
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/signin"
                className="rounded-full bg-black/5 px-4 py-2 text-[11px] font-semibold tracking-wide transition-colors hover:bg-black/10"
              >
                LOG IN
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-black px-4 py-2 text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-neutral-800"
              >
                SIGN UP
              </Link>
            </div>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Cart with ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5"
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </header>
  );
}

function AccountOptions({
  user,
  showDialog,
  onClose,
}: {
  user: User;
  showDialog: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`absolute right-0 top-12 z-50 w-72 origin-top-right rounded-xl border border-black/10 bg-white p-2 shadow-xl transition-all duration-200 ${
        showDialog
          ? "visible scale-100 opacity-100"
          : "invisible scale-95 opacity-0"
      }`}
    >
      {/* User */}
      <div className="flex items-center gap-3 border-b border-black/10 px-3 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5">
          <CircleUserRound
            size={25}
            className="text-black/50"
            strokeWidth={1.5}
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {user?.name}
          </p>

          <p className="mt-0.5 truncate text-xs text-black/45">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="py-2">
        <Link
          href="/profile"
          onClick={onClose}
          className="block rounded-lg px-3 py-3 text-sm transition-colors hover:bg-black/5"
        >
          My Profile
        </Link>

        <Link
          href="/orders"
          onClick={onClose}
          className="block rounded-lg px-3 py-3 text-sm transition-colors hover:bg-black/5"
        >
          My Orders
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-black/45 transition-colors hover:bg-black/5 hover:text-black"
        >
          <LogOut
            size={18}
            strokeWidth={1.7}
          />

          Sign Out
        </button>
      </div>
    </div>
  );
}
