import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SubjectResolved } from '../shared/models/subjects';
import { SubjectService } from '../shared/services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectResolverService implements Resolve<SubjectResolved> {

  constructor(private subjectSerivce: SubjectService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<SubjectResolved> {
    console.log('Subject Resolver');
    const BodyOfKnowledgeId = route.paramMap.get('BodyOfKnowledgeId');
    if (isNaN(+BodyOfKnowledgeId)) {
      const message = `Subject id was not a number: ${BodyOfKnowledgeId}`;
      console.error(message);
      return of({ subject: null, count: 0, error: message });
    }
    return this.subjectSerivce.getSubject(+BodyOfKnowledgeId)
      .pipe(
        map(sub => ({ subject: sub , count: 1})),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          return of({ subject: null, count: 0, error: message });
        })
      );
  }
}
