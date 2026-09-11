import Container from "@/components/ui/Container";
import NewArrivals from "@/components/homepage/NewArrivals";
import FeaturedProducts from "@/components/homepage/ProductsList";
import TopCategories from "@/components/homepage/TopCategories";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

//
export default async function Home() {
  const products = await getProducts();
  const latestProducts = await getProducts("latest");
  const categories = await getCategories();

  return (
    <div className="flex flex-col m-auto bg-transparent md:gap-16 gap-10 w-full ">
      <HeroSec />
      <TopCategories categories={categories} />
      <NewArrivals products={latestProducts} />
      <SubHeroOne />
      <FeaturedProducts products={products} />
    </div>
  );
}

function SubHeroOne() {
  return (
    <div className="py-12 bg-neutral-800 ">
      <Container className="grid md:grid-cols-2 gap-5 justify-between w-full">
        <div>
          <Image
            src={
              "/homepage_decorations/mohamed-shimaq-yEkmyaZDiDM-unsplash.jpg"
            }
            alt=""
            height={800}
            width={500}
            className="object-cover h-140 md:w-[80%] w-full z-50 rounded-3xl"
          />
        </div>

        <div className="flex flex-col w-2/3 items-left text-white justify-center">
        <p className="opacity-30 text-sm tracking-widest mb-3">URBAN LOOM</p>
          <p className="md:text-6xl text-5xl text-left font-heading mb-6">
            Shop the Latest Trends
          </p>
          <p className="opacity-50 text-left mb-6">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <Link
            href={"/shop"}
            className="border-2 hover:bg-white hover:text-black text-sm font-semibold border-white px-8 py-4 w-fit mt-3"
          >
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}

function HeroSec() {
  return (
    <div className=" m-auto relative w-full h-[60vh] md:h-[70vh] lg:h-screen">
      {/* Image sits directly in the relative parent, outside Container */}
      <Image
        src="/homepage_decorations/ChatGPT Image Sep 11, 2026, 10_15_18 PM.png"
        alt=""
        width={3000}
        height={3000}
        loading="eager"
        className="object-cover w-full h-full
        "
      />

      {/* Container only wraps the text content */}
      <div className="top-0 left-0 right-0 bottom-0 absolute bg-[#00000040]">
        <Container className=" z-10 h-full flex gap-12">
          <div className="flex text-white flex-col gap-4 md:py-12 py-3 md:w-1/2 w-2/3">

            <div className="opacity-80 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-white"></div>

              <span className="md:text-sm text-xs font-semibold">FASHION & LIFESTYLE</span>
              <div className="w-8 h-0.5 bg-white"></div>
            </div>


            <p className="text-5xl md:text-6xl lg:text-8xl font-heading">
              Unleash Your Style, Shop the Latest Trends
            </p>

            <p className="opacity-80 text-sm md:text-base font-light w-full">
              Urban fashion reimagined scarefully crafted pieces designed to
              express who you are. Every thread tells a story crafted for the
              streets, designed for your identity.
            </p>

           <div className="flex items-center gap-4">
             <Link
              href={"/shop"}
              className="bg-white text-xs text-nowrap flex rounded-xs items-center w-fit gap-1.5 font-semibold text-black md:px-10 px-6 py-3 mt-6 md:mt-8"
            >
              <p>SHOP NOW</p>
              <ShoppingBag size={18} />
            </Link>

              <Link
              href={"/shop"}
              className="border-[1.5px] text-nowrap border-white text-xs flex rounded-xs items-center w-fit gap-1.5 font-semibold text-white md:px-10 px-6 py-3 mt-6 md:mt-8"
            >
              <p>CONTACT US</p>
              <ArrowRight size={18} />
            </Link>
           </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
