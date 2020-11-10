import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ResponsesResolved } from '../shared/models/response';
import { ResponsesService } from '../shared/services/responses.service';


@Injectable({
  providedIn: 'root'
})
export class ResponsesResolverService implements Resolve<ResponsesResolved> {

  constructor(private responsesService: ResponsesService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponsesResolved> {
      const QuestionId = route.paramMap.get('QuestionId');

      if (isNaN(+QuestionId) || QuestionId == null) {
        const message = `Question id is not a number: ${QuestionId}`;
        console.error(message);
        return of({ responses: [], count: 0, error: message });
        }

      return this.responsesService.getQuestionResponses(+QuestionId)
      .pipe(
        map(sub => ({ responses: sub, count: sub.length, error: '' })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          return of({ responses: [], count: 0, error: message });
        })
      );
  }

}
