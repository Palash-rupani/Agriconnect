export interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  discount?: number;
  images?: string[];
  categoryID?: string;
  brandID?: string;
  isfeatured?: boolean;
  isnew?: boolean;
}
