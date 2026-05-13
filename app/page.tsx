import Container from "@/components/ui/Container";
import NewArrivals from "@/components/homepage/NewArrivals";
import FeaturedProducts from "@/components/homepage/ProductsList";
import TopCategories from "@/components/homepage/TopCategories";
import Image from "next/image";
import { Product } from "@/types/products";

//
export default async function Home() {
  const products = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    const data = await res.json();
    return data.products as Product[];
  };

   const latestProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?sort=latest`);
    const data = await res.json();
    return data.products as Product[];
  };

  console.log(await latestProducts());
  
  return (
    <div className="flex flex-col m-auto bg-transparent w-full">
      <HeroSec />
      <TopCategories />
      <NewArrivals products={await latestProducts()} />
      <SubHeroOne />
      <FeaturedProducts products={await products()} />
    </div>
  );
}

function SubHeroOne() {
  return (
    <Container className="py-12 my-12 bg-neutral-800">
      <div className="grid grid-cols-2 justify-between w-full">
        <div>
          <Image
            src={"/photo-1564557287817-3785e38ec1f5.jpeg"}
            alt=""
            height={600}
            width={500}
            className="object-cover h-100 w-[80%] z-50 rounded-3xl"
          />
        </div>

        <div className="flex flex-col gap-6 items-left text-white justify-center">
          <p className="text-6xl text-left">Shop the Latest Trends</p>
          <p className="opacity-50 text-xs text-left">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <button className="border-2 border-white px-8 py-4 w-fit rounded-full mt-3">
            Shop Now
          </button>
        </div>
      </div>
    </Container>
  );
}

function HeroSec() {
  return (
    <div className="bg-offwhite relative lg:h-180 h-140">
      <Image
        src="/young-trendy-woman-model-outside-street-ed.jpg"
        alt=""
        sizes="100vw"
        fill
        loading="eager"
        className="w-full h-full object-cover absolute shadow-md "
      />
      <Container className="rounded-3xl grid grid-cols-2 gap-12 h-full items-center absolute">
        <div className=" flex text-white flex-col items-start justify-center gap-4 rounded-l-3xl py-12">
          <div className="opacity-30 flex items-center gap-3">
            <span className="text-sm">FASHION & LIFESTYLE</span>
            <div className="w-8 h-0.5 bg-white"></div>
          </div>
          <p className="lg:text-[4.5rem] text-6xl lg:leading-20">
            Unleash Your Style, Shop the Latest Trends
          </p>
          <p className="opacity-50">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-full mt-8">
            Shop Now
          </button>
        </div>
      </Container>
    </div>
  );
}
