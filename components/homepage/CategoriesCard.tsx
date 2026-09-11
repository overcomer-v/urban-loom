import { ArrowRight, Images } from "lucide-react";
import Image from "next/image";

export default function CategoriesCard({ label, img }: { label: string; img: string }) {
  return (
    <div className="relative h-70 md:h-90 rounded overflow-hidden">
      <Image
        src={img}
        alt=""
        fill
        className="object-cover absolute "
        loading="eager"
      />
      <div className="w-full h-full absolute bg-black opacity-30"></div>
      <Images className="absolute top-3 right-3" stroke="white" />
      <div className="flex items-center group hover:bg-white hover:text-black text-white gap-3 transition-all hover:gap-4  absolute bottom-8 md:left-8 left-2 border-2 py-2 px-4 border-white rounded-sm">
        <p className="font-medium  font-heading md:text-xl text-lg">{label}</p>
        <ArrowRight
          size={28}
          strokeWidth={2}
          className="group-hover:text-black text-white p-1"
        />
      </div>
    </div>
  );
}