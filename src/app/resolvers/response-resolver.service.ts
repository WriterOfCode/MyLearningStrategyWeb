import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ResponseResolved } from '../shared/models/response';
import { ResponsesService } from '../shared/services/responses.service';


@Injectable({
  providedIn: 'root'
})
export class ResponseResolverService implements Resolve<ResponseResolved> {

  constructor(private responsesService: ResponsesService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseResolved> {
      const ResponseId = route.paramMap.get('ResponseId');
      const QuestionId = route.paramMap.get('QuestionId');

      if (isNaN(+ResponseId) || ResponseId == null) {
        const message = `Response id is not a number: ${ResponseId}`;
        console.error(message);
        return of({ response: null, error: message });
        }

      if (isNaN(+QuestionId) || QuestionId == null) {
        const message = `Question id is not a number: ${QuestionId}`;
        console.error(message);
        return of({ response: null, error: message });
        }

      return this.responsesService.getResponse(+QuestionId, +ResponseId)
      .pipe(
        map(sub => ({ response: sub })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          return of({ response: null, error: message });
        })
      );
  }
}
