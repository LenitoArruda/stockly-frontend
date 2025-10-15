export type ProductsFilterProps = {
  name?: string;
  sku?: string;
  categoryId?: number;
  minPrice?: number | string;
  maxPrice?: number | string;
  page: number;
  pageSize: number;
  sortBy?: 'name' | 'sku' | 'category' | 'stock' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
};

export type ProductResponsePros = {
  data: ProductProps[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ProductProps = {
  categoryId: number;
  categoryName: string;
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  variants?: ProductVariantProps[];
};

export type ProductVariantProps = {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  attributes: Record<string, string>;
};

export type CreateProductProps = {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  sku: string;
};
