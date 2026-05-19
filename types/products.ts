export interface Product {
  id: string;
  name: string;
  description: string;
  sizes: Size[];
  sex:ProductSexType;
  price: number;
  images:string[];
  category:string;
  category_id:string;
}

export interface Size{
  stock:number;
  size:string
}

export const SEX_OPTIONS = ["male", "female", "unisex"] as const;

export type ProductSexType = (typeof SEX_OPTIONS)[number];
