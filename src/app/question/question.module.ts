import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../shared/material-module';

import { QuestionListComponent } from './question-list.component';
import { QuestionsResolverService } from '../resolvers/questions-resolver.service';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionResolverService} from '../resolvers/question-resolver.service';
import { QuesitonListSortDirective } from './quesiton-list-sort.directive';
import { QuestionListService } from './question-list.service';
import { OriginatorGuard } from '../shared/originator.guard';


@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionDetailComponent,
    QuesitonListSortDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            component: QuestionListComponent,
            canActivate: [MsalGuard, OriginatorGuard],
            resolve: { resolvedData: QuestionListService },
          },
          {
            path: ':QuestionId/detail',
            component: QuestionDetailComponent,
            // resolve: { resolvedData: QuestionResolverService }
          },
          {
            path: ':QuestionId/edit',
            loadChildren: () =>
            import('../question-edit/question-edit.module').then(m => m.QuestionEditModule)
          }
        ]
      }
     ])
  ],

})
export class QuestionModule { }
