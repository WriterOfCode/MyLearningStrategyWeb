import { throwError as _throw } from 'rxjs';
import { Component, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategorySortColumn, CategorySortDirection, CategorySortEvent } from '../shared/models/category';
import { CategoriesListSortDirective } from './categories-list-sort.directive';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sortCategory(category: Category[], column: CategorySortColumn, direction: CategorySortDirection): Category[] {
  if (direction === '' || column === '') {
    return category;
  } else {
    return [...category].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

@Component({
  selector: 'mls-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  @ViewChildren(CategoriesListSortDirective) headers: QueryList<CategoriesListSortDirective>;

  @Output() search = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() categorySelected = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<number>();
  @Output() editCategory = new EventEmitter<Category>();
  @Output() addCategory = new EventEmitter<void>();

  @Input() errorMessage: string;
  @Input() categories: Category[];
  @Input() selectedCategory: Category;
  @Input() isBusy: boolean;
  @Input() pageSize: number;
  @Input() categoriesCount: number;
  @Input() currentPage: number;

  constructor( private router: Router ) { }


  onSort({column, direction}: CategorySortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.mLSCategoriesListSort !== column) {
        header.direction = '';
      }
    });
    this.categories = sortCategory(this.categories, column, direction);
  }

  onPageSizeChange(pagesize: number)
  {
    this.pageSizeChange.emit(pagesize);
  }

  onDelete(selectedCategory: Category): void {
    if (selectedCategory && selectedCategory.categoryId !== 0){
      if (confirm(`Do you realy want to detete the Category:  ${selectedCategory.categoryName}?`)) {
        this.deleteCategory.emit(selectedCategory.categoryId);
      }
    } else {
      // No need to delete, it was never saved
      this.deleteCategory.emit(0);
    }
  }

  onEdit(selectedCategory: Category): void {
    this.editCategory.emit(selectedCategory);
    this.router.navigate(['/categories', 'edit']);
  }

  onAdd(): void {
    console.log('list initializeCurrentCategory');
    this.addCategory.emit();
   // this.router.navigate(['/categories', 'edit']);
  }

  onSelected(category: Category): void {
    this.categorySelected.emit(category);
  }

  set searchTerm(search: string) {
    this.search.emit(search);
  }
}

