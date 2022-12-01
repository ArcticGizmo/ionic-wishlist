import { SortFilterConfig, SortType } from '@/types';

export const sortItems = <T>(items: T[], config: SortFilterConfig): T[] => {
  const arr = items.slice() as any[];
  const { sortBy, sortAsc, sortType } = config;

  if (sortType === SortType.number) {
    if (sortAsc) {
      return arr.sort((a, b) => (a[sortBy] || 0) - (b[sortBy] || 0));
    }
    return arr.sort((b, a) => (a[sortBy] || 0) - (b[sortBy] || 0));
  }

  if (sortAsc) {
    return arr.sort((a, b) => (a[sortBy] || '').localeCompare(b[sortBy] || ''));
  }
  return arr.sort((b, a) => (a[sortBy] || '').localeCompare(b[sortBy] || ''));
};
