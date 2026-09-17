"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleUser,
  CircleUserRound,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  User2,
  UserCheck,
  UserCog,
  UserIcon,
  UserPlus,
  UserRound,
  UserRoundX,
} from "lucide-react";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Categories } from "@/types/Categories";
import { User } from "@/types/User";
import { CategoriesSec } from "./CategoriesSec";
import { useRouter } from "next/navigation";

export default function Header({
  user,
  onMenuClick,
}: {
  user: User;
  onMenuClick: () => void;
}) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const accountRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!showDialog) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setShowDialog(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [showDialog]);

  return (
    <header className="bg-white py-3 border-b border-neutral-300">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu
            className="md:hidden flex"
            onClick={() => {
              onMenuClick();
            }}
          />
          <Link href="/">
            <Image
              src="/homepage_decorations/urban-loom-icon.png"
              alt=""
              width={30}
              height={30}
              className="rounded-lg"
            />
          </Link>

          <Link href="/" className="font-semibold md:text-xl text-sm">
            URBAN LOOM
          </Link>
        </div>

        <div className="items-center gap-8 text-xs font-semibold hidden md:flex tracking-wide">
          <Link href="/">HOME</Link>
          <CategoriesSec categories={categories} loading={loading} />

          <Link href="/about">ABOUT US</Link>
          <Link href="/contact-us">CONTACT US</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/shop?mode=query">
            <Search className="h-10 w-10 p-2 rounded-full hover:bg-neutral-100" />
          </Link>
          {user ? (
            <div className="inline-block relative " ref={accountRef}>
              <div
                onClick={() => {
                  setShowDialog((init) => !init);
                }}
                className="flex items-center gap-1 py-2 cursor-pointer rounded-xl hover:bg-neutral-100 group w-9 hover:px-3 hover:w-28 overflow-hidden transition-[width] duration-300 ease-in-out"
              >
                <UserRound className="h-6 w-6 rounded-full shrink-0" />
                <span className="text-sm tracking-wider font-medium whitespace-nowrap opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out text-black">
                  {user.name.split(" ", 1)}
                </span>
              </div>{" "}
              <AccountOptions user={user} showDialog={showDialog} />
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                href={"/signin"}
                className="bg-neutral-100 px-5 py-2 text-xs rounded-4xl text-nowrap"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="bg-black text-white px-5 py-2 text-xs rounded-4xl text-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}
          <Link href={"/cart"}>
            <ShoppingBag className="w-6 h-6" />{" "}
          </Link>
        </div>
      </Container>
    </header>
  );
}

function AccountOptions({
  user,
  showDialog,
}: {
  user: User;
  showDialog: boolean;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.refresh();
  };
  return (
    <div
      className={`${showDialog ? "flex" : "hidden"} flex-col top-15 shadow-lg -right-20 absolute z-1000 bg-white p-4 px-2 rounded-lg`}
    >
      <section
        className={`flex items-center gap-4 border-b-2 px-3 pb-4 border-neutral-200`}
      >
        <CircleUserRound className="rounded-full opacity-40" size={60} />
        <div>
          <span className="text-wrap font-medium font-sans tracking-wider ">
            {user?.name.split(" ", 2).join(" ")}
          </span>{" "}
          <span className="text-wrap text-sm opacity-50">{user?.email}</span>
        </div>
      </section>

      <div className="hover:bg-neutral-100 px-3 py-3 rounded-md">
        My Profile
      </div>
      <div className="hover:bg-neutral-100 px-3 py-3 rounded-md">My Orders</div>

      <div
        onClick={handleLogout}
        className="hover:bg-neutral-100 px-3 py-3 rounded-md flex items-center gap-3 opacity-40"
      >
        <LogOut size={20} />

        <p className="">Sign Out</p>
      </div>
    </div>
  );
}
