export interface WishlistItem {
  name: string;
  url?: string;
  brand?: string;
  notes?: string;
  tags?: string[];
  src?: string;
  price?: number;
  rating?: number;
}

export enum SortType {
  'number' = 'number',
  'string' = 'string'
}

export interface SortFilterOption {
  name: string;
  type: SortType;
}

export interface SortFilterConfig {
  sortBy: string;
  sortAsc: boolean;
  sortType: SortType;
}
