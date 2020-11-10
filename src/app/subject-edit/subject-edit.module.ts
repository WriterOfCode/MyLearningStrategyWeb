import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { SubjectResolverService } from '../resolvers/subject-resolver.service';
import { SubjectService} from '../shared/services/subject.service';
import { SubjectEditGuard } from './subject-edit.guard';
import { SubjectEditComponent } from './subject-edit.component';
import { SubjectEditInfoComponent } from './subject-edit-info.component';
import { SubjectEditTagsComponent } from './subject-edit-tags.component';
import { SubjectEditImageComponent } from './subject-edit-image.component';
import { AzureStorageModule } from '../azure-storage/azure-storage.module';
/* Font Awesome */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileCsv, faExclamation, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MaterialModule } from '../shared/material-module';
import { InputFileModule } from '../shared/input-file.module';
// Add FontAwesome icons
library.add( faFileCsv, faExclamation, faExclamationCircle, faExclamationTriangle );

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AzureStorageModule,
    FontAwesomeModule,
    MaterialModule,
    InputFileModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubjectEditComponent,
        resolve: { resolvedData: SubjectResolverService },
        canActivate: [MsalGuard],
        canDeactivate : [SubjectEditGuard],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: SubjectEditInfoComponent },
          { path: 'tags', component: SubjectEditTagsComponent },
          { path: 'image', component: SubjectEditImageComponent },
          {
            path: 'questions',
            loadChildren: () =>
            import('../question/question.module').then(m => m.QuestionModule)
          },
        ]
      }
     ])
  ],
  declarations: [
    SubjectEditComponent,
    SubjectEditInfoComponent,
    SubjectEditTagsComponent,
    SubjectEditImageComponent,
  ],
  providers: [ SubjectService, {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true}
  ]
})
export class SubjectEditModule { }
