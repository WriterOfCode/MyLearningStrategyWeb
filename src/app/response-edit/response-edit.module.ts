import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MsalGuard } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponseEditGuard } from './response-edit.guard';
import { ResponseEditComponent } from './response-edit.component';
import { ResponseResolverService} from '../resolvers/response-resolver.service';
import { ResponseEditInfoComponent } from './response-edit-info.component';
import { ResponseEditImageComponent } from './response-edit-image.component';

@NgModule({
  declarations: [
    ResponseEditComponent,
    ResponseEditInfoComponent,
    ResponseEditImageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResponseEditComponent,
        resolve: { resolvedData: ResponseResolverService},
        canActivate: [MsalGuard],
        canDeactivate: [ResponseEditGuard],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ResponseEditInfoComponent },
          { path: 'image', component: ResponseEditImageComponent },
        ]
      }
     ])
  ]
})
export class ResponseEditModule { }
