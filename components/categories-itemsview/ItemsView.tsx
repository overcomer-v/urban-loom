"use client";

import { LucideGrid3x3, Rows4, X } from "lucide-react";
import Dropdown from "../ui/StatusDropDown";
import { GridContainer } from "../ui/GridContainer";
import { Product, SEX_OPTIONS } from "@/types/products";
import { BaseProductCard, SecondaryProductCard } from "../ui/ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SORT_OPTIONS } from "@/constants/Sorting-constants";
import { SortOption } from "@/types/Sorting";


export function ItemsView({ products }: { products: Product[] }) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = SORT_OPTIONS.find(
    (item) => item.value === searchParams.get("sort"),
  );
  const currentSex = searchParams.get("sex") ?? "";

  const sexDropdownOptions = [...SEX_OPTIONS];


  useEffect(()=>{
    window.scroll({top:0,behavior:"smooth"})
  },[]);

  function handleFilterChange(filter: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(filter, value);
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  function handleSortChange(sort: SortOption) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  function clearFilters() {
    router.push(`${pathname}`);
    router.refresh();
  }
  return (
    <div>
      <div className="my-3 gap-4 flex md:flex-row flex-col-reverse items-center justify-between ">
       <div className="flex items-center justify-between w-full">
         <LayoutSettings layout={layout} setLayout={setLayout} />
         <button
            onClick={clearFilters}
            className="bg-black text-white rounded-md text-nowrap py-2 px-3 flex gap-2 md:hidden items-center"
          >
            <X />
            <p className="text-sm">Clear Filters</p>
          </button>
       </div>
        <div className="flex items-center md:gap-3 md:justify-normal md:w-fit justify-between w-full">
          <Dropdown
            initialOption={{ label: currentSort?.label ?? "" }}
            label="SortBy"
            options={SORT_OPTIONS.map((item) => {
              return { label: item.label, id: item.value };
            })}
            onSelect={(value) => {
              handleSortChange(value.id as SortOption);
            }}
          />
          <Dropdown
            initialOption={{ label: currentSex }}
            label="Sex"
            options={sexDropdownOptions.map((item) => {
              return { label: item };
            })}
            onSelect={(value) => {
              handleFilterChange("sex", value.label);
            }}
          />

         <button
            onClick={clearFilters}
            className="bg-black text-white hidden md:flex rounded-md text-nowrap py-3 px-5 gap-2 items-center"
          >
            <X />
            <p className="text-sm">Clear Filters</p>
          </button>
        </div>
      </div>
      <div className="mt-10">
        {layout === "grid" ? (
          <GridContainer>
            {products.map((item: Product, index: number) => {
              return <BaseProductCard key={index} product={item} />;
            })}
          </GridContainer>
        ) : (
          <div className="flex flex-col gap-6">
            {products.map((product: Product) => (
              <SecondaryProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LayoutSettings({
  layout,
  setLayout,
}: {
  layout: "grid" | "list";
  setLayout: (layout: "grid" | "list") => void;
}) {
  return (
    <div className="flex items-center ">
      {" "}
      <LucideGrid3x3
        className={`cursor-pointer ${layout === "list" && "opacity-20"}`}
        onClick={() => {
          if (layout != "grid") {
            setLayout("grid");
          }
        }}
        strokeWidth={2}
        fill=""
        stroke="white"
        size={32}
      />{" "}
      <Rows4
        className={`cursor-pointer ${layout === "grid" && "opacity-20"}`}
        onClick={() => {
          if (layout != "list") {
            setLayout("list");
          }
        }}
        fill="black"
        strokeWidth={2.2}
        size={32}
        stroke="white"
      />
    </div>
  );
}
