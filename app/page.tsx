import Container from "@/components/ui/Container";
import Subtitle from "@/components/ui/Subtitle";
import {
  ArrowRight,
  ArrowRightCircle,
  ChevronRightCircle,
  Images,
} from "lucide-react";
import Image from "next/image";

//
export default function Home() {
  return (
    <div className="flex flex-col m-auto bg-transparent w-full">
      <HeroPage />
      <TopCategories />
      <NewArrivals />
      <SubHeroOne />
      <FeaturedProducts />
      {/* <SubHero /> */}
    </div>
  );
}

function TopCategories() {
  return (
    <Container className="">
      <div className="grid grid-cols-5 gap-4 pt-24 pb-6">
        {[
          {
            label: "Hoodies",
            img: "/homepage_decorations/abraham-flores-VoP2WK9rTa4-unsplash.jpg",
          },
          {
            label: "Formalwear",
            img: "/homepage_decorations/hero3.png",
          },
          {
            label: "Shirts",
            img: "/homepage_decorations/shirt-mockup-concept-with-plain-clothing.jpg",
          },
          {
            label: "Joggers",
            img: "/homepage_decorations/leo_visions-tDmx86tPlqA-unsplash.jpg",
          },
          {
            label: "Accessories",
            img: "/homepage_decorations/fabio-alves-MNzyXXfnnCg-unsplash.jpg",
          },
        ].map((category) => (
          <CategoriesCard
            key={category.label}
            label={category.label}
            img={category.img}
          />
        ))}
      </div>
    </Container>
  );
}

function CategoriesCard({ label, img }: { label: string; img: string }) {
  return (
    <div className="relative h-90 rounded-xl overflow-hidden">
      <Image
        src={img}
        alt=""
        fill
        className="object-cover absolute"
        loading="eager"
      />
      <div className="w-full h-full absolute bg-black opacity-50"></div>
      <Images className="absolute top-3 right-3" stroke="white" />
      <div className="flex items-center gap-3 absolute bottom-8 left-8 border-2 py-2 px-4 border-white rounded-full">
        <p className="font-medium text-xl text-white  ">{label}</p>
        <ArrowRight
          size={28}
          strokeWidth={2}
          className="rounded-full bg-white p-1"
        />
      </div>
    </div>
  );
}

async function NewArrivals() {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=street fashion`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    },
  );
  const data = await res.json();

  // console.log(process.env.UNSPLASH_ACCESS_KEY);
  // console.log(data);
  const images = data.results;
  return (
    <section className="my-16">
      <Container className="space-y-6">
        <Subtitle label="Top Picks" />
        <div className="grid grid-cols-4 items-center justify-between gap-4">
          {images.map((image: unknown, index: number) => (
            <div className="flex flex-col gap-4 items-start" key={index}>
              <Image
                src={image?.urls?.small}
                alt=""
                height={200}
                width={200}
                className="h-60 w-full object-cover"
              />
              <div className="space-y-1">
                <p className="opacity-40 text-xs">UNISEX</p>
                <p className="font-medium">{"The Plumetis knit dress"}</p>
                <p className="opacity-80">{"300$"}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
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

function HeroPage() {
  return (
    <div className="bg-offwhite relative h-180">
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
          <p className="text-[4.5rem] leading-20">
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

async function FeaturedProducts() {
  const array = [];

  for (let index = 0; index < 16; index++) {
    array.push(index);
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=street fashion&page=2&per_page=20`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    },
  );
  const data = await res.json();

  // console.log(process.env.UNSPLASH_ACCESS_KEY);
  // console.log(data);
  const images = data.results;

  return (
    <section className="my-12">
      <Container className="space-y-3">
        <Subtitle label="Featured Products" />
        <div className="grid grid-cols-4 items-center justify-between gap-4">
          {images.map((item: any, index: number) => (
            <div className="flex flex-col gap-4 items-start" key={index}>
              <Image
                src={item.urls.small}
                alt=""
                height={200}
                width={200}
                className="h-60 w-full object-cover"
              />
              <div className="space-y-1">
                <p className="opacity-40 text-xs">UNISEX</p>
                <p className="font-medium">{"The Plumetis knit dress"}</p>
                <p className="opacity-80">{"300$"}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
