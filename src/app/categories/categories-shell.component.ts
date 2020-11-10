import { throwError as _throw, Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
/* NgRx */
import { Store } from '@ngrx/store';
import { State,
  getCurrentCategory,
  getCategoryListError,
  getFilteredCategories,
  getCategoryListPageSize,
  getCategoryIsBusy,
  getCategoryListCurrentPage,
  getCategoryCount } from './state/categories.selectors';
import { CategoriesPageActions } from './state/actions/categories-actions-index';
import { Category } from '../shared/models/category';

@Component({
  selector: 'mls-categories-shell',
  templateUrl: './categories-shell.component.html',
  styleUrls: ['./categories-shell.component.css']
})
export class CategoriesShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  categories$: Observable<Category[]>;
  selectedCategory$: Observable<Category>;
  isBusy$: Observable<boolean>;
  categoriesCount$: Observable<number>;
  pageSize$: Observable<number>;
  currentPage$: Observable<number>;


  constructor(  private store: Store<State>) {
    this.categories$ = this.store.select(getFilteredCategories);
    this.errorMessage$ = this.store.select(getCategoryListError);
    this.selectedCategory$ = this.store.select(getCurrentCategory);
    this.isBusy$ = this.store.select(getCategoryIsBusy);
    this.categoriesCount$ = this.store.select(getCategoryCount);
    this.pageSize$ = this.store.select(getCategoryListPageSize);
    this.currentPage$ = this.store.select(getCategoryListCurrentPage);
  }


  ngOnInit() {
    this.store.dispatch(CategoriesPageActions.categoryIsBusy({isBusy: true}));
    this.store.dispatch(CategoriesPageActions.loadCategories());
    this.store.dispatch(CategoriesPageActions.categoryIsBusy({isBusy: false}));
  }
  filter(search: string) {
    console.log('shell filter');
    this.store.dispatch(CategoriesPageActions.categoryFilterEvent({searchTerm: search}));
  }
  pageSizeChange(pagesize: number)
  {
    this.store.dispatch(CategoriesPageActions.categoryPageSizeEvent({ pageSize: pagesize}));
  }
  deleteCategory(selectedCategory: Category): void {
    if (selectedCategory && selectedCategory.categoryId !== 0){
      this.store.dispatch(CategoriesPageActions.deleteCategory({CategoryId: selectedCategory.categoryId}));
    } else {
      this.store.dispatch(CategoriesPageActions.clearCurrentCategory());
    }
  }
  editCategory(selectedCategory: Category): void {
    this.store.dispatch(CategoriesPageActions.setCurrentCategory({ currentCategoryId: selectedCategory.categoryId }));
  }
  addShellCategory(): void {
    this.store.dispatch(CategoriesPageActions.initializeCurrentCategory());
  }
  // tslint:disable-next-line: no-shadowed-variable
  onSelected(Category: Category): void {
    this.store.dispatch(CategoriesPageActions.setCurrentCategory({ currentCategoryId: Category.categoryId }));
  }
}
