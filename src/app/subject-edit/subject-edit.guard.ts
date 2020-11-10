import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { SubjectEditComponent } from './subject-edit.component';

@Injectable({
  providedIn: 'root'
})
export class SubjectEditGuard implements CanDeactivate<SubjectEditComponent>, CanActivate {


  canDeactivate(component: SubjectEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (component.isDirty) {
      return confirm(`Navigate away and lose all changes to ${component.subject.name }?`);
    }
    return true;
  }

  canActivate(currentRoute: ActivatedRouteSnapshot,
              currentState: RouterStateSnapshot,
              nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
                return true;
    }

  canActivateChild(
      component: SubjectEditComponent,
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return confirm(`Navigate away and lose all changes to ${component.subject.name }?`);
    }
}
