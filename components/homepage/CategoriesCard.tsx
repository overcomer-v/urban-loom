import { ArrowRight, Images } from "lucide-react";
import Image from "next/image";

export default function CategoriesCard({ label, img }: { label: string; img: string }) {
  return (
    <div className="relative h-90 rounded-xl overflow-hidden">
      <Image
        src={img}
        alt=""
        fill
        unoptimized
        className="object-cover absolute "
        loading="eager"
      />
      <div className="w-full h-full absolute bg-black opacity-50"></div>
      <Images className="absolute top-3 right-3" stroke="white" />
      <div className="flex items-center gap-3 absolute bottom-8 left-8 border-2 py-2 px-4 border-white rounded-full">
        <p className="font-medium text-lg text-white  ">{label}</p>
        <ArrowRight
          size={28}
          strokeWidth={2}
          className="rounded-full bg-white p-1"
        />
      </div>
    </div>
  );
}