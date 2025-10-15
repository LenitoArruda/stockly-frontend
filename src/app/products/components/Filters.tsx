'use client';
import { DefaultButton } from '@/components/default-button';
import { useCategories } from '@/hooks/useCategories';
import { ProductsFilterProps } from '@/types/product.types';
import { Box, DropdownMenu } from '@radix-ui/themes';
import { defaultFilter } from '../page';
import { convertDataToSelectOptions } from '@/lib/utils';

interface FiltersProps {
  filters: ProductsFilterProps;
  setFilters: (filters: ProductsFilterProps) => void;
}

export function Filters(props: FiltersProps) {
  const { filters, setFilters } = props;

  const { data: dataCategories } = useCategories();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const resetFilters = () => {
    setFilters(defaultFilter);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DefaultButton>Filters</DefaultButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-white rounded-xl shadow-xl p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-2 rounded shadow">
          <p className="text-sm text-gray-800 font-bold col-span-1 md:col-span-2">
            Filters
          </p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name || ''}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={filters.sku || ''}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice || ''}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice || ''}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="categoryId"
            value={filters.categoryId || ''}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select category</option>
            {convertDataToSelectOptions(dataCategories).map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-800 font-bold col-span-1 md:col-span-2">
            Order
          </p>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="createdAt">Created At</option>
            <option value="name">Name</option>
            <option value="sku">SKU</option>
            <option value="category">Category</option>
            <option value="stock">Stock</option>
            <option value="price">Price</option>
          </select>

          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <Box className="w-full flex justify-center col-span-1 md:col-span-2">
            <DefaultButton onClick={resetFilters}>Reset Filters</DefaultButton>
          </Box>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
