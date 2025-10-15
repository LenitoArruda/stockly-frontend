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
