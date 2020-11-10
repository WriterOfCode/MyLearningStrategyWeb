import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { QuestionsResolved } from '../shared/models/questions';
import { QuestionService } from '../shared/services/question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsResolverService implements Resolve<QuestionsResolved> {
  BodyOfKnowledgeId: number;
  constructor(private questionSerivce: QuestionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuestionsResolved> {
    console.log("Questions Resolver");
    const thisBodyOfKnowledgeId = route.paramMap.get('BodyOfKnowledgeId');
    const parentBodyOfKnowledgeId = route.parent.paramMap.get('BodyOfKnowledgeId');

    if (thisBodyOfKnowledgeId === null) {
      if (parentBodyOfKnowledgeId === null) {
        const message = `Subject id not found`;
        console.error(message);
        return of({ questions: null, count: 0, error: message });
      } else {
        this.BodyOfKnowledgeId = +parentBodyOfKnowledgeId;
      }
    } else {
      this.BodyOfKnowledgeId = +thisBodyOfKnowledgeId;
    }
    console.log('Questions Resolver BodyOfKnowledgeId: ${BodyOfKnowledgeId}');


    return this.questionSerivce.getQuestionsBySubject(this.BodyOfKnowledgeId)
    .pipe(
      map(sub => ({ questions: sub, count: sub.length,  error: '' })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.log(message);
        return of({ questions: null, count: 0, error: message });
      }),
    );
  }
}
