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
    <div className="flex flex-col m-auto bg-transparent md:gap-16 gap-10 w-full mb-16">
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
    <section className="bg-offwhite py-16 md:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Image */}
          <Link href="/shop" className="group relative block overflow-hidden">
            <Image
              src="/homepage_decorations/mohamed-shimaq-yEkmyaZDiDM-unsplash.jpg"
              alt="Urban Loom fashion collection"
              width={800}
              height={1000}
              className="h-[520px] w-full object-cover object-center transition duration-700 group-hover:scale-105 md:h-[650px]"
            />

            {/* Image label */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
              <span className="h-px w-8 bg-white" />

              <span className="text-[10px] font-medium tracking-[0.25em]">
                URBAN LOOM
              </span>
            </div>
          </Link>

          {/* Content */}
          <div className="flex max-w-xl flex-col">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-black" />

              <p className="text-[10px] font-semibold tracking-[0.3em] text-black/45">
                THE URBAN LOOM EDIT
              </p>
            </div>

            {/* Heading */}
            <h2 className="font-heading text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Made for the
              <br />
              <span className="italic">way you move.</span>
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-md text-sm leading-7 text-black/55 md:text-base">
              Contemporary pieces designed with character, confidence, and
              everyday movement in mind. Discover styles that feel as individual
              as you are.
            </p>

            {/* CTA */}
            <Link
              href="/shop"
              className="group mt-9 flex w-fit items-center gap-4 border border-black bg-black px-7 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition duration-300 hover:bg-transparent hover:text-black"
            >
              EXPLORE COLLECTION
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroSec() {
  return (
    <section className="relative h-[72svh] min-h-[520px] w-full overflow-hidden md:h-[78vh] lg:h-screen">
      <Image
  src="/homepage_decorations/ChatGPT Image Sep 11, 2026, 10_15_18 PM.png"
  alt="Urban Loom fashion collection"
  fill
  priority
  quality={100}
  sizes="100vw"
  className="object-cover object-[65%_center] w-full h-full md:object-[60%_center]"
/>

      {/* Image overlay */}
      <div className="absolute z-50 inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
      <Container className="relative z-50 h-full">
        <div className="flex h-full items-end pb-16 md:pb-24 lg:pb-28">
          <div className="w-full max-w-2xl text-white">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3 opacity-80">
              <div className="h-px w-8 bg-white" />

              <span className="text-[11px] md:text-xs font-medium tracking-[0.25em]">
                FASHION & LIFESTYLE
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Define your
              <br />
              <span className="italic">everyday.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-sm leading-6 text-white/80 md:text-base">
              Carefully crafted pieces for those who see fashion as an
              expression of identity.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="group flex items-center gap-3 bg-white px-7 py-3.5 text-xs font-semibold tracking-wider text-black transition hover:bg-neutral-200"
              >
                SHOP COLLECTION
                <ShoppingBag
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/contact-us"
                className="group flex items-center gap-3 border border-white/70 px-7 py-3.5 text-xs font-semibold tracking-wider text-white transition hover:bg-white hover:text-black"
              >
                CONTACT US
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
