import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';
import { AuthService } from '../shared/auth/auth.service';
/* NgRx */
import { Store } from '@ngrx/store';
import { getCurrentCategory, State } from './state/categories.selectors';
import { CategoriesPageActions } from './state/actions/categories-actions-index';
import { Category } from '../shared/models/category';

@Component({
  selector: 'mls-category-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  @ViewChild(NgForm) categoryEditForm: NgForm;
  pageTitle = 'Edit';
  errorMessage: string;
  private originalCategory: Category;
  currentCategory: Category;

  get isDirty(): boolean {
    return JSON.stringify(this.originalCategory) !== JSON.stringify(this.currentCategory);
  }

  get isValid(): boolean {
    return true;
  }

  constructor(private user: AuthService,
              private store: Store<State>,
              private router: Router,
              private alertsService: AlertsService) { }

  ngOnInit() {
    this.store.select(getCurrentCategory)
      .subscribe(data => this.currentCategory = data);
    // this.currentCategory = JSON.parse(JSON.stringify(this.originalCategory));
    if (!this.currentCategory) {
      this.pageTitle = 'Category not found';
    } else {
      if (this.currentCategory.categoryId === 0) {
        this.pageTitle = 'Add Category';
      } else {
        this.pageTitle = `Edit Category:`;
      }
    }
  }

  onDelete(): void {
    if (this.currentCategory && this.currentCategory.categoryId !== 0){
      if (confirm(`Do you realy want to detete the Category:  ${this.currentCategory.categoryName}?`)) {
        this.store.dispatch(CategoriesPageActions.deleteCategory({CategoryId: this.currentCategory.categoryId}));
        this.alertsService.add('success', 'Category', `${this.currentCategory.categoryName} was deleted`);
        // Navigate back to the strategies list
        this.router.navigate(['/categories']);
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(CategoriesPageActions.clearCurrentCategory());
      this.alertsService.add('success', 'Category', `${this.currentCategory.categoryName} was deleted`);
      // Navigate back to the strategies list
      this.router.navigate(['/categories']);
    }
  }

  onSave(): void {
    // if (this.isDirty) {

    // }
    // else{ console.log("not dirty category"); }
          // Copy over all of the original product properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const newCategory = { ...this.originalCategory, ...this.currentCategory };
      if (this.currentCategory .categoryId === 0) {
        this.currentCategory .userProfileId = this.user.userProfile.userProfileId;
        this.store.dispatch(CategoriesPageActions.createCategory({ Category: this.currentCategory  }));
        this.alertsService.add('success', 'Category', `The new ${this.currentCategory.categoryName} was saved`);
        // Navigate back to the strategies list
        this.router.navigate(['/categories']);
      } else {
        this.store.dispatch(CategoriesPageActions.updateCategory({ Category: this.currentCategory  }));
        this.alertsService.add('success', 'Category', `The updated ${this.currentCategory.categoryName} was saved`);
        // Navigate back to the strategies list
        this.router.navigate(['/categories']);
      }
  }
  onCancel(){
    this.router.navigate(['/categories']);
  }
}
