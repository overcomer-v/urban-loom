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
import Subtitle from "../ui/Subtitle";
import { SORT_OPTIONS } from "@/constants/Sorting-constants";

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
    <Container className="w-full flex flex-col gap-4">
      <Subtitle
        label="Top Categories"
        showButton
        onNavLink={`/shop?type=newarrivals&sort=${SORT_OPTIONS[0].value}`}
      />
      <div className="grid md:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] grid-cols-2  gap-2  pb-6 overflow-scroll no-scrollbar">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.id}?name=${category.category}`}
            key={category.id}
            className=" w-full md:aspect-3/4"
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
