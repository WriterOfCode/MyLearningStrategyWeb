import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { MaterialModule } from '../shared/material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CategoriesListComponent } from './categories-list.component';
import { CategoriesEditComponent } from './categories-edit.component';
import { CategoriesListSortDirective } from './categories-list-sort.directive';
import { OriginatorGuard } from '../shared/originator.guard';
import { CategoriesEffects } from './state/categories.effects';
import { CategoriesReducer } from './state/categories.reducer';
import { CategoriesShellComponent } from './categories-shell.component';

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('category', CategoriesReducer),
    EffectsModule.forFeature([CategoriesEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: CategoriesShellComponent,
        canActivate: [MsalGuard, OriginatorGuard]
      },
      {
        path: 'edit',
        component: CategoriesEditComponent,
        canActivate: [ OriginatorGuard ]
      }
    ])
  ],
  declarations: [
    CategoriesListComponent,
    CategoriesShellComponent,
    CategoriesEditComponent,
    CategoriesListSortDirective],
})
export class CategoriesModule { }
