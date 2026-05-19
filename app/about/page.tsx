import Container from "@/components/ui/Container";
import { Quote } from "lucide-react";
import Image from "next/image";

export default async function AboutUs() {
  return (
    <div className="flex flex-col py-24 gap-24">
      {" "}
      <Container className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-4 ">
          <h1 className="text-5xl font-bold font-heading">ABOUT US</h1>
          <p className="opacity-60 text-sm">
            At Urban Loom, we believe fashion is more than clothing — it’s
            self-expression. We create modern streetwear and timeless essentials
            designed for confidence and comfort. Our goal is to blend style,
            quality, and individuality into every piece we make. Inspired by
            urban culture and everyday creativity, our collections are built for
            people who stand out naturally. We focus on clean designs, premium
            feel, and versatile fashion for every moment. Every product is
            crafted with attention to detail and a passion for authenticity.
            Urban Loom is where simplicity meets bold identity. Wear your style.
            Own your presence.
          </p>
        </div>

        <div className="relative w-120 h-120">
          {/* Offset block */}
          <div className="absolute -bottom-10 -right-10 w-full h-full bg-offwhite rounded-lg" />

          {/* Image */}
          <div className="relative rounded-lg w-full h-full overflow-hidden">
            <Image
              fill
              className="absolute object-cover"
              src={`/about/hunter-newton-YjxcPMb7JGw-unsplash-balck.jpg`}
              alt=""
            />
          </div>
        </div>
      </Container>
      {/* <Container className="bg-offwhite grid grid-cols-3 py-24 xl:gap-24 lg:gap-16 gap-8 items-center justify-between">
        <Points
          label="Quality Craftsmanship"
          sublabel="Carefully designed pieces made for comfort, durability, and everyday style."
          src="/about/businessman_fashion_suit_jacket.jpg"
        />{" "}
        <Points
          label="Modern Urban Style"
          sublabel="Minimal yet bold fashion inspired by street culture and contemporary trends."
          src="/about/freestocks-_3Q3tsJ01nc-unsplash.jpg"
        />{" "}
        <Points
          label="Confidence in Every Fit"
          sublabel="Clothing created to help you express yourself naturally and confidently."
          src="/about/hunter-newton-YjxcPMb7JGw-unsplash-balck.jpg"
        />{" "}
      </Container> */}
      <Container className="grid grid-cols-2 mt-12 items-center">
        <div className="relative w-120 h-120">
          {/* Offset block */}
          <div className="absolute -bottom-10 -right-10 w-full h-full bg-offwhite rounded-lg" />

          {/* Image */}
          <div className="relative rounded-lg w-full h-full overflow-hidden">
            <Image
              fill
              className="absolute object-cover"
              src={`/about/ali-pazani-9u1dYZc9U8g-unsplash.jpg
`}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <Quote fill="" />
          <p className=" opacity-50 text-lg w-[70%]">
            Urban Loom was built with a simple vision, to create fashion that
            feels natural, confident, and timeless. We believe style should not
            be loud to be powerful, and every piece we design is meant to help
            you express who you are without saying a word. Our goal is to blend
            modern streetwear with everyday comfort, making quality and identity
            accessible in every fit.
          </p>
          <span className="text-orange-900 font-semibold">Overcomer,CEO</span>
        </div>
      </Container>
    </div>
  );
}
function Points({
  label,
  sublabel,
  src,
}: {
  label: string;
  sublabel: string;
  src: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white p-6 rounded-3xl">
      <img className="h-60 w-60 rounded-full object-cover" src={src} alt="" />
      <h3 className="text font-extrabold text-nowrap mt-4 font-heading">
        {label.toUpperCase()}
      </h3>
      <p className="text-xs opacity-50 text-center">{sublabel}</p>
    </div>
  );
}
