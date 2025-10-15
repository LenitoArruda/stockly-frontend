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
  parentId?: number;
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  variants?: ProductVariantProps[];
  attributes?: Record<string, string>;
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

export type UpdateProductProps = {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  attributes?: Record<string, string>;
};

export type CreateVariantProps = {
  name: string;
  sku: string;
  price: number;
  stock: number;
  parentId: number;
  attributes: Record<string, string>;
};
