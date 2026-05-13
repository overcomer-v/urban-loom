"use client"
import Image from "next/image";
import Container from "../ui/Container";
import Subtitle from "../ui/Subtitle";
import { Product } from "@/types/products";
import { BaseProductCard } from "../ui/ProductCard";

export default function NewArrivals({products}:{products:Product[]}) {
  // const res = await fetch(
  //   `https://api.unsplash.com/search/photos?query=street fashion`,
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
    <section className="my-16">
      <Container className="space-y-6">
        <Subtitle label="Top Picks" showButton />
        <div className="grid grid-cols-4 items-center justify-between gap-4">
          {products.map((item:Product) => (
            <BaseProductCard key={item.id} product={item}/>
          ))}
        </div>
      </Container>
    </section>
  );
}
