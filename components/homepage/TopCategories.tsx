"use client";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import CategoriesCard from "./CategoriesCard";
import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle, LoaderIcon } from "lucide-react";

interface Categories{
  id:string;
  category:string;
  image_url:string;
}

export default function TopCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        console.log(data.categories);
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return loading ? (
    <div className="h-40 w-full flex items-center justify-center">
      <LoaderIcon />
    </div>
  ) : (
    <Container className="flex flex-col gap-6 pt-20" >

      {/* <div className=" gap-8 flex items-center justify-between w-full">
        <ChevronLeft className="rounded-full bg-neutral-100 h-10 w-10 p-2"/>
        <ChevronRight className="rounded-full bg-neutral-100 h-10 w-10 p-2"/>
      </div> */}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-2  pb-6 overflow-scroll no-scrollbar">
        {categories.map((category) => (
         <div key={category.id} className=" w-full aspect-3/4">
           <CategoriesCard
            label={category.category}
            img={category.image_url}
          />
         </div>
        ))}
      </div>

    </Container>
  );
}
