import Container from "@/components/ui/Container";
import NewArrivals from "@/components/homepage/NewArrivals";
import FeaturedProducts from "@/components/homepage/ProductsList";
import TopCategories from "@/components/homepage/TopCategories";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

//
export default async function Home() {
  const products = await getProducts();
  const latestProducts = await getProducts("latest");
  const categories = await getCategories();

  return (
    <div className="flex flex-col m-auto bg-transparent w-full">
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
    <div className="py-12 my-12 bg-neutral-800 ">
      <Container className="grid grid-cols-2 justify-between w-full">
        <div>
          <Image
            src={
              "/homepage_decorations/mohamed-shimaq-yEkmyaZDiDM-unsplash.jpg"
            }
            alt=""
            height={800}
            width={500}
            className="object-cover h-140 w-[80%] z-50 rounded-3xl"
          />
        </div>

        <div className="flex flex-col gap-6 items-left text-white justify-center">
          <p className="text-6xl text-left font-heading">
            Shop the Latest Trends
          </p>
          <p className="opacity-50 text-xs text-left">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <button className="border-2 text-sm font-semibold border-white px-8 py-4 w-fit rounded-full mt-3">
            Shop Now
          </button>
        </div>
      </Container>
    </div>
  );
}

function HeroSec() {
  return (
    <div className="bg-offwhite relative aspect-video w-screen ">
      {/* Image sits directly in the relative parent, outside Container */}
      <Image
        src="/homepage_decorations/young-trendy-woman-model-outside-street-ed.jpg"
        alt=""
        sizes="100vw"
        fill
        loading="eager"
        className="object-cover"
      />

      {/* Container only wraps the text content */}
      <Container className="relative z-10 grid grid-cols-2 gap-12 h-full items-center">
        <div className="flex text-white flex-col items-start justify-center gap-4 py-12">
          <div className="opacity-50 flex items-center gap-3">
            <span className="text-sm">FASHION & LIFESTYLE</span>
            <div className="w-8 h-0.5 bg-white"></div>
          </div>
          <p className="text-6xl lg:text-8xl font-heading">
            Unleash Your Style, Shop the Latest Trends
          </p>
          <p className="opacity-50 text-sm font-light">
            Urban fashion reimagined scarefully crafted pieces designed to
            express who you are. Every thread tells a story crafted for the
            streets, designed for your identity.
          </p>
          <button className="bg-white text-sm font-semibold text-black px-6 py-3 rounded-full mt-8">
            Shop Now
          </button>
        </div>
      </Container>
    </div>
  );
}
