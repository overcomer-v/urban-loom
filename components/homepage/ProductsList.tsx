"use client";
import Container from "../ui/Container";
import Subtitle from "../ui/Subtitle";
import { Product } from "@/types/products";
import { BaseProductCard } from "../ui/ProductCard";
import { GridContainer } from "../ui/GridContainer";

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="my-12 will-change-transform">
      <Container className="space-y-3">
        <Subtitle label="Featured Products" showButton onNavLink={`/shop?type=Featured`} />
        <GridContainer>
          {products.map((item: Product, index: number) => {
            console.log(item.images[0]);
            return <BaseProductCard key={index} product={item} />;
          })}
        </GridContainer>
      </Container>
    </section>
  );
}
