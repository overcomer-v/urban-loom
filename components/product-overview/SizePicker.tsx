"use client";

import { Size } from "@/types/products";

export function SizePicker({
  onSizeSelected,
  selectedSize,
  sizes,
}: {
  sizes: Size[];
  onSizeSelected: (size: Size) => void;
  selectedSize: Size;
}) {
  // const sizes = ["S", "M", "XL", "XLL"];

  return (
    <div className="flex flex-col gap-1 mt-3">
      {" "}
      <span className="opacity-40 text-sm">Select size</span>
      <div className="flex gap-2 mt-2">
        {sizes.map((item, index) => (
          <div
            key={index + item.size}
            className={`text-sm shrink-0 ${selectedSize.size === item.size ? "bg-neutral-800 text-white" : "bg-neutral-100"} cursor-pointer rounded-full  flex items-center justify-center h-12 w-16`}
            onClick={() => {
              onSizeSelected(item);
            }}
          >
            {item.size}
          </div>
        ))}
      </div>
    </div>
  );
}
