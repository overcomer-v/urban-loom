import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function CategoriesCard({
  label,
  img,
}: {
  label: string;
  img: string;
}) {
  return (
    <div className="group relative h-70 md:h-100 overflow-hidden rounded-sm">
      <Image
        src={img}
        alt={label}
        fill
        loading="eager"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient only where the label needs legibility — keeps the photo full-strength elsewhere */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <span className="block h-px w-8 bg-white/70 mb-3 transition-all duration-500 ease-out group-hover:w-14" />
        <div className="flex items-end justify-between gap-3">
          <h3 className="text- md:text-2xl text-white leading-none">
            {label}
          </h3>
          <ArrowUpRight
            size={22}
            strokeWidth={1.5}
            className="text-white/80 mb-1 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </div>
  );
}