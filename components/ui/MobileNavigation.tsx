"use client";

import { useState } from "react";

import Header from "@/components/ui/Header";
import MobileNavBar from "@/components/ui/MobileNavBar";
import { User } from "@/types/User";

type MobileNavigationProps = {
  user: User;
};

export default function MobileNavigation({
  user,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header
        user={user}
        onMenuClick={() => setIsOpen(true)}
      />

      <MobileNavBar
        isOpen={isOpen}
        user={user}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}