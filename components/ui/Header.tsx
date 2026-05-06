"use client";

import { Search } from "lucide-react";
import Container from "./Container";

export default function Header() {
  return (
    <Container className="font-semibold bg-offwhite ">
      <header className="flex items-center justify-between py-8 border-b border-neutral-300" >
        <h2>URBAN LOOM</h2>
        <div className="flex items-center gap-6">
          <p>Hoodies</p>
          <p>T-Shirts</p>
          <p>Pants</p>
          <p>Sex</p>
        </div>
        <div>
          <Search className="h-6 w-6 " />
        </div>
      </header>
    </Container>
  );
}
