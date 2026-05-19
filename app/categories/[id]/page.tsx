import { ItemsView } from "@/components/categories-itemsview/ItemsView";
import Container from "@/components/ui/Container";
import Subtitle from "@/components/ui/Subtitle";
import { getProducts } from "@/lib/products";
import { Product, ProductSexType } from "@/types/products";
import { SortOption } from "@/types/Sorting";

export default async function CategoriesItemsView({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort?: SortOption; sex?: string,name?:string }>;
}) {
  const { id: category_id } = await params;
  const { sort = "" as SortOption, sex = "",name } = await searchParams;

  const products: Product[] = await getProducts(sort, category_id, {
    sex: sex as ProductSexType,
  });

  console.log("Server Triggered:", sort,sex);

  return (
    <div>
      <Container className="py-8">
        <Subtitle label={name?.toUpperCase() ?? ""} />
        <ItemsView products={products} />
      </Container>
    </div>
  );
}
