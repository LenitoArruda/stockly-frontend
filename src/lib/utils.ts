import { CategoryProps } from '@/types/categories.types';
import { SelectProps } from '@/types/general.types';

export const formatUsd = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const convertDataToSelectOptions = (
  dataCategories: CategoryProps[],
): SelectProps[] => {
  let options: SelectProps[] = [];
  if (dataCategories) {
    options = dataCategories.map((category: CategoryProps) => ({
      value: category.id,
      label: category.name,
    }));
  }
  return options;
};

export const createSku = (name: string): string => {
  return `SKU-${name.slice(0, 2).toUpperCase()}-${new Date().getTime()}`;
};

export function safeLocalStorage() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
}
