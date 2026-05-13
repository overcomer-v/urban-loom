export interface Product {
  id: string;
  name: string;
  description: string;
  amount_in_stock: number;
  sex:ProductSexType;
  price: number;
  image_url:string;
  category:string;
}

export const SEX_OPTIONS = ["male", "female", "unisex"] as const;

export type ProductSexType = (typeof SEX_OPTIONS)[number];
