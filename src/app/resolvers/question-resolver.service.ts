import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { QuestionResolved } from '../shared/models/questions';
import { QuestionService } from '../shared/services/question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolverService implements Resolve<QuestionResolved> {
  BodyOfKnowledgeId: number;
  constructor(private questionSerivce: QuestionService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<QuestionResolved> {
    console.log('Question Resolver');
    const thisBodyOfKnowledgeId = route.paramMap.get('BodyOfKnowledgeId');
    const parentBodyOfKnowledgeId = route.parent.paramMap.get('BodyOfKnowledgeId');
    const QuestionId  = route.paramMap.get('QuestionId');
    if (isNaN(+QuestionId) || QuestionId == null) {
      const message = `Question Id id not a number: ${QuestionId}`;
      console.error(message);
      return of({ question: null, error: message });
    }
    if (thisBodyOfKnowledgeId === null) {
      if (parentBodyOfKnowledgeId === null) {
        const message = `Subject id not found`;
        console.error(message);
        return of({ question: null, error: message });
      } else {
        if (isNaN(+parentBodyOfKnowledgeId)) {
          const message = `Subject id not a number: ${parentBodyOfKnowledgeId}`;
          console.error(message);
          return of({ question: null, error: message });
        }
        this.BodyOfKnowledgeId = +parentBodyOfKnowledgeId;
      }
    } else {
      if (isNaN(+thisBodyOfKnowledgeId)) {
        const message = `Subject id not a number: ${thisBodyOfKnowledgeId}`;
        console.error(message);
        return of({ question: null, error: message });
      }
      this.BodyOfKnowledgeId = +thisBodyOfKnowledgeId;
    }

    return this.questionSerivce.getQuestion(this.BodyOfKnowledgeId, +QuestionId)
      .pipe(
        map(sub => ({ question: sub })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ question: null, error: message });
        })
      );
    }
}
