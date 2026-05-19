import { ItemsView } from "@/components/categories-itemsview/ItemsView";
import Container from "@/components/ui/Container";
import Subtitle from "@/components/ui/Subtitle";
import { getProducts } from "@/lib/products";
import { Product, ProductSexType } from "@/types/products";
import { SortOption } from "@/types/Sorting";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ sort?: SortOption; sex?: string; type: string }>;
}) {
  const { sort = "" as SortOption, sex = "", type } = await searchParams;

  const products: Product[] = await getProducts(sort, undefined, {
    sex: sex as ProductSexType,
  });

  console.log("Server Triggered:", sort, sex);

  return (
    <div>
      <Container className="py-8">
       <div className="mt-8">
         <Subtitle titleClassName="text-xl" label={type.toUpperCase()} />
       </div>
        <ItemsView products={products} />
      </Container>
    </div>
  );
}
