import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionEditComponent } from './question-edit.component';
import { QuestionResolverService } from '../resolvers/question-resolver.service';
import { QuestionEditInfoComponent } from './question-edit-info.component';
import { QuestionEditImageComponent } from './question-edit-image.component';
import { QuestionEditGuard } from './question-edit.guard';
import { InputFileModule } from '../shared/input-file.module';

@NgModule({
  declarations: [
    QuestionEditComponent,
    QuestionEditInfoComponent,
    QuestionEditImageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    InputFileModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionEditComponent,
        resolve: { resolvedData: QuestionResolverService},
        canActivate: [MsalGuard],
        canDeactivate: [QuestionEditGuard],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: QuestionEditInfoComponent },
          { path: 'image', component: QuestionEditImageComponent },
          {
            path: 'responses',
            loadChildren: () =>
            import('../response/response.module').then(m => m.ResponseModule)
          }
        ]
      }
     ])
  ],
})
export class QuestionEditModule { }
