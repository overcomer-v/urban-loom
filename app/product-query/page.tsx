import { ItemsView } from "@/components/categories-itemsview/ItemsView";
import { SearchBox } from "@/components/product-query/SearchBox";
import Container from "@/components/ui/Container";
import Subtitle from "@/components/ui/Subtitle";
import { getProducts } from "@/lib/products";
import { Product, ProductSexType } from "@/types/products";
import { SortOption } from "@/types/Sorting";

export default async function ProductsQuery({
  searchParams,
}: {
  //   params: Promise<{ id: string }>;
  searchParams: Promise<{
    sort?: SortOption;
    sex?: string;
    name?: string;
    query: string;
  }>;
}) {
  //   const { id: category_id } = await params;
  const { sort = "" as SortOption, sex = "", query = "" } = await searchParams;

  const products: Product[] = await getProducts(
    sort,
    undefined,
    {
      sex: sex as ProductSexType,
    },
    query,
  );

  console.log("Server Triggered:", sort, sex);

  return (
    <div>
      <Container className="py-8">
        <div className="flex justify-between items-center">
          <Subtitle label={query ? `Results for "${query}"` : ""} />
          <SearchBox/>
        </div>

        <ItemsView products={products} />
      </Container>
    </div>
  );
}
