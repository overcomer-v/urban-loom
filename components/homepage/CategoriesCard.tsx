import { ArrowRight, Images } from "lucide-react";
import Image from "next/image";

export default function CategoriesCard({
  label,
  img,
}: {
  label: string;
  img: string;
}) {
  return (
    <div className="relative h-70 md:h-100 rounded-md overflow-hidden">
      <Image
        src={img}
        alt=""
        fill
        className="object-cover absolute "
        loading="eager"
      />
      <div className="w-full h-full absolute bg-black opacity-30"></div>
      <Images className="absolute top-3 right-3" stroke="white" />
      <div
        className="flex items-center group hover:text-black gap-1 transition-all absolute bottom-2  md:left-3 left-2 border-[1.5px] rounded
        px-4 py-1 hover:bg-white border-white text-white md:bottom-3"
      >
        <p className="font-semibold font-heading md:text-lg text-base">{label}</p>
        <ArrowRight
          size={18}
          strokeWidth={2}
          className="group-hover:text-black text-white mt-1"
        />
      </div>
    </div>
  );
}
