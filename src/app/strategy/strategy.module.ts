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

import { StrategyListComponent } from './strategy-list.component';
import { StrategyEditComponent } from './strategy-edit.component';
import { StrategyListSortDirective } from './strategy-list-sort.directive';
import { OriginatorGuard } from '../shared/originator.guard';
import { StrategyEffects } from './state/strategy.effects';
import { StrategyReducer } from './state/strategy.reducer';
import { StrategyShellComponent } from './strategy-shell.component';

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('strategy', StrategyReducer),
    EffectsModule.forFeature([StrategyEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: StrategyShellComponent,
        canActivate: [MsalGuard, OriginatorGuard]
      },
      {
        path: 'edit',
        component: StrategyEditComponent,
        canActivate: [ OriginatorGuard ]
      }
    ])
  ],
  declarations: [
    StrategyListComponent,
    StrategyEditComponent,
    StrategyListSortDirective,
    StrategyShellComponent
  ]
})
export class StrategyModule { }
