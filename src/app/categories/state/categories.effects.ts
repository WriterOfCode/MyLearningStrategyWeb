import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesApiActions, CategoriesPageActions } from './actions/categories-actions-index';
import { CategoriesService } from '../../shared/services/categories.service';

@Injectable()
export class CategoriesEffects{

  constructor(private actions$: Actions,
              private categoriesService: CategoriesService) { }

    loadCategory$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(CategoriesPageActions.loadCategories),
          mergeMap(() => this.categoriesService.getCategories()
            .pipe(
              map(Category => CategoriesApiActions.loadCategoriesSuccess({ Category })),
              tap(category => CategoriesPageActions.categoryPageSizeEvent ({pageSize: category.Category.length}) ),
              catchError(error => of(CategoriesApiActions.loadCategoriesFailure({ error })))
            )
          )
        );
    });

    updateCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CategoriesPageActions.updateCategory),
        concatMap(action =>
          this.categoriesService.updateCategory(action.Category)
            .pipe(
              map(Category => CategoriesApiActions.updateCategorySuccess({ Category })),
              catchError(error => of(CategoriesApiActions.updateCategoryFailure({ error })))
            )
          )
        );
    });

    createCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CategoriesPageActions.createCategory),
          concatMap(action =>
            this.categoriesService.addCategory(action.Category)
              .pipe(
                map(Category => CategoriesApiActions.createCategorySuccess ({ Category })),
                catchError(error => of(CategoriesApiActions.createCategoryFailure({ error })))
              )
            )
          );
    });

    deleteCategory$ = createEffect(() => {
    return this.actions$
      .pipe(
          ofType(CategoriesPageActions.deleteCategory),
            mergeMap(action =>
              this.categoriesService.deleteCategory(action.CategoryId).pipe(
                map(() => CategoriesApiActions.deleteCategorySuccess({ CategoryId: action.CategoryId })),
                catchError(error => of(CategoriesApiActions.deleteCategoryFailure ({ error })))
              )
            )
          );
    });
}
