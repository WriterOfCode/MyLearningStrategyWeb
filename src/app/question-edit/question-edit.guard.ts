import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';
import { QuestionEditComponent } from './question-edit.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionEditGuard implements CanDeactivate<QuestionEditComponent>,  CanActivate, CanActivateChild {

  canDeactivate(component: QuestionEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  if (component?.isDirty) {
    return confirm(`Navigate away and lose all changes to question ${component.question.question}?`);
  }
  return true;
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
