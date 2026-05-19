import { ProductDetails } from "@/components/product-overview/ProductDetails";
import Container from "@/components/ui/Container";
import { getProduct } from "@/lib/products";
import { Product } from "@/types/products";

export default async function ProductOverview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product: Product = await getProduct(id);
  return (
    <Container className="pb-20">
      <ProductDetails product={product} />
    </Container>
  );
}
