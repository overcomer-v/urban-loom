"use client";
import Image from "next/image";
import Container from "../ui/Container";
import Subtitle from "../ui/Subtitle";
import { Product } from "@/types/products";
import { BaseProductCard } from "../ui/ProductCard";
import { GridContainer } from "../ui/GridContainer";
import { SORT_OPTIONS } from "@/constants/Sorting-constants";

export default function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="my-16 will-change-transform">
      <Container className="space-y-6">
        <Subtitle
          label="Top Picks"
          showButton
          onNavLink={`/shop?type=newarrivals&sort=${SORT_OPTIONS[0].value}`}
        />
        <GridContainer>
          {products.map((item: Product) => (
            <BaseProductCard key={item.id} product={item} />
          ))}
        </GridContainer>
      </Container>
    </section>
  );
}
