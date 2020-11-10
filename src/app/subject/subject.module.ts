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

import { SubjectListComponent } from './subject-list.component';
import { SubjectDetailComponent } from './subject-detail.component';
import { SubjectResolverService } from '../resolvers/subject-resolver.service';
import { SubjectListSortDirective } from './subject-list-sort.directive';
import { SubjectListService } from './subject-list.service';
// /* Fort Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OriginatorGuard } from '../shared/originator.guard';
import { SubjectEffects } from './state/subject.effects';
import { SubjectReducer } from './state/subject.reducer';

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    StoreModule.forFeature('subject', SubjectReducer),
    EffectsModule.forFeature([SubjectEffects]),
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: SubjectListComponent,
            canActivate: [MsalGuard, OriginatorGuard],
            resolve: { resolvedData: SubjectListService },
          },
          {
            path: ':BodyOfKnowledgeId/detail',
            component: SubjectDetailComponent,
            canActivate: [MsalGuard, OriginatorGuard],
            resolve: { resolvedData: SubjectResolverService }
          },
          {
            path: ':BodyOfKnowledgeId/edit',
            loadChildren: () =>
            import('../subject-edit/subject-edit.module').then(m => m.SubjectEditModule)
          },
        ]
      }
     ])
  ],
  declarations: [
    SubjectListComponent,
    SubjectDetailComponent,
    SubjectListSortDirective,
  ]
})
export class SubjectModule { }
