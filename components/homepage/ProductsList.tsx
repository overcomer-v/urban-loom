"use client";
import Image from "next/image";
import Container from "../ui/Container";
import Subtitle from "../ui/Subtitle";
import { Product } from "@/types/products";
import { BaseProductCard } from "../ui/ProductCard";

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  // const array = [];

  // for (let index = 0; index < 16; index++) {
  //   array.push(index);
  // }

  // const res = await fetch(
  //   `https://api.unsplash.com/search/photos?query=street fashion&page=2&per_page=20`,
  //   {
  //     headers: {
  //       Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  //     },
  //   },
  // );
  // const data = await res.json();

  // // console.log(process.env.UNSPLASH_ACCESS_KEY);
  // // console.log(data);
  // const images = data.results;

  return (
    <section className="my-12">
      <Container className="space-y-3">
        <Subtitle label="Featured Products" showButton />
        <div className="grid grid-cols-4 items-start gap-4">
          {products.map((item: Product, index: number) => {
            console.log(item.image_url);
            return <BaseProductCard key={index} product={item} />;
          })}
        </div>
      </Container>
    </section>
  );
}
