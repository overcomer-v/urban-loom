"use client";

import { useEffect, useState } from "react";

import Header from "@/components/ui/Header";
import MobileNavBar from "@/components/ui/MobileNavBar";
import { User } from "@/types/User";

type MobileNavigationProps = {
  user: User;
};

export default function MobileNavigation({ user }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
  return (
    <>
      <Header user={user} onMenuClick={() => setIsOpen(true)} />

      <MobileNavBar
        isOpen={isOpen}
        user={user}
        onClose={() => setIsOpen(false)}
        cartCount={cartCount}
      />
    </>
  );
}
