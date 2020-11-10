import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../shared/material-module';

import { ResponseListComponent } from './response-list.component';
import { ResponseDetailComponent } from './response-detail.component';
import { ResponsesResolverService} from '../resolvers/responses-resolver.service';
import { ResponseResolverService} from '../resolvers/response-resolver.service';
import { ResponseListSortDirective } from './response-list-sort.directive';

@NgModule({
  declarations: [ResponseListComponent, ResponseDetailComponent, ResponseListSortDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: ':QuestionId',
            component: ResponseListComponent,
            canActivate: [MsalGuard],
            resolve: { resolvedData: ResponsesResolverService },
          },
          {
            path: ':QuestionId/detail/:ResponseId',
            component: ResponseDetailComponent,
            canActivate: [MsalGuard],
            resolve: { resolvedData: ResponseResolverService }
          },
          {
            // https://localhost:4200/subjects/37/edit/questions/37/106/edit/responses/106/responseid
            // https://localhost:4200/subjects/37/edit/questions/37/106/edit/responses/106/123/info
            path: ':QuestionId/:ResponseId',
            loadChildren: () =>
            import('../response-edit/response-edit.module').then(m => m.ResponseEditModule)
          }
        ]
      }
     ])
  ]
})
export class ResponseModule { }
