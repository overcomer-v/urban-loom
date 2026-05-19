"use client";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import CategoriesCard from "./CategoriesCard";
import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  ChevronRightCircle,
  LoaderIcon,
} from "lucide-react";
import Link from "next/link";

interface Categories {
  id: string;
  category: string;
  image_url: string;
}

export default function TopCategories({
  categories,
}: {
  categories: Categories[];
}) {
  return (
    <Container className="pt-20 w-full">

        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-2  pb-6 overflow-scroll no-scrollbar">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.id}?name=${category.category}`}
              key={category.id}
              className=" w-full aspect-3/4"
            >
              <CategoriesCard
                label={category.category}
                img={category.image_url}
              />
            </Link>
          ))}
        </div>
      
    </Container>
  );
}
