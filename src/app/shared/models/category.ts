import {Guid} from 'guid-typescript';

export interface Category {
  categoryId: number;
  userProfileId: number;
  categoryName: string;
  imageDevice?: any;
  imageCloud?: any;
  imageHash: number;
  lastModifiedOffset: Date;
  cloudRowId: Guid;
}

export interface CategoryState {
  currentCategoryId: number | null;
  categories: Category[];
  error?: any;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: CategorySortColumn;
  sortDirection: CategorySortDirection;
  isBusy: boolean;
}

// export interface CategoryListState {
//   currentPage: number;
//   pageSize: number;
//   searchTerm: string;
//   sortColumn: CategorySortColumn;
//   sortDirection: CategorySortDirection;
// }

export interface CategoryResolved {
  Category: Category;
  error?: any;
}

export interface CategiesResolved {
  Category: Category[];
  count: number;
  error?: any;
}

export interface CategorySortEvent {
  column: CategorySortColumn;
  direction: CategorySortDirection;
}

export type CategorySortColumn = keyof Category | '';
export type CategorySortDirection = 'asc' | 'desc' | '';
