import { Product } from "./products";

export interface EditableProduct extends Product {
  category_id: string;
}
