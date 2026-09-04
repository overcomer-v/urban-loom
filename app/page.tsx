import Container from "@/components/ui/Container";
import NewArrivals from "@/components/homepage/NewArrivals";
import FeaturedProducts from "@/components/homepage/ProductsList";
import TopCategories from "@/components/homepage/TopCategories";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import { ShoppingBag } from "lucide-react";

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

        <div className="flex flex-col gap-6 items-left text-white justify-center">
          <p className="md:text-6xl text-5xl text-left font-heading">
            Shop the Latest Trends
          </p>
          <p className="opacity-50 text-xs text-left">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <button className="border-2 hover:bg-white hover:text-black text-sm font-semibold border-white px-8 py-4 w-fit rounded-full mt-3">
            Shop Now
          </button>
        </div>
      </Container>
    </div>
  );
}

function HeroSec() {
  return (
    <div className=" relative w-full md:h-screen h-80">
      {/* Image sits directly in the relative parent, outside Container */}
      <Image
        src="/homepage_decorations/young-trendy-woman-model-outside-street-ed.jpg"
        alt=""
        width={2000}
        height={2000}
        loading="eager"
        className="object-cover w-full h-full
        "
      />

      {/* Container only wraps the text content */}
      <Container className="top-0  left-0 absolute z-10 h-full grid gap-12 items-center md:w-1/2 w-2/3">
        <div className="flex text-white flex-col items-start justify-center gap-4 md:py-12 py-3">
          <div className="opacity-50 flex items-center gap-3">
            <span className="md:text-sm text-xs">FASHION & LIFESTYLE</span>
            <div className="w-8 h-0.5 bg-white"></div>
          </div>
          <p className="text-3xl md:text-6xl  lg:text-7xl font-heading">
            Unleash Your Style, Shop the Latest Trends
          </p>
          <p className="opacity-50  text-[0.6rem] hidden md:flex md:text-sm font-light w-full">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <button className="bg-white text-sm flex items-center gap-1.5 font-semibold text-black px-6 py-4 rounded-full mt-6 md:mt-8">
            <p>Shop Now</p>
            <ShoppingBag  size={20}/>
          </button>
        </div>
      </Container>
    </div>
  );
}
