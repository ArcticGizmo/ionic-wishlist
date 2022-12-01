import { SortFilterConfig, SortType } from '@/types';

export interface SortedItem<T> {
  index: number;
  item: T;
}

export const sortItems = <T>(items: T[], config: SortFilterConfig): SortedItem<T>[] => {
  const arr: SortedItem<any>[] = items.map((item, index) => ({ item, index }));
  const { sortBy, sortAsc, sortType } = config;

  if (sortType === SortType.number) {
    if (sortAsc) {
      return arr.sort((a, b) => (a.item[sortBy] || 0) - (b.item[sortBy] || 0));
    }
    return arr.sort((b, a) => (a.item[sortBy] || 0) - (b.item[sortBy] || 0));
  }

  if (sortAsc) {
    return arr.sort((a, b) => (a.item[sortBy] || '').localeCompare(b.item[sortBy] || ''));
  }
  return arr.sort((b, a) => (a.item[sortBy] || '').localeCompare(b.item[sortBy] || ''));
};
