import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubjectApiActions, SubjectPageActions } from './actions/subject-actions-index';
import { SubjectService } from '../../shared/services/subject.service';


@Injectable()
export class SubjectEffects{
      constructor(private actions$: Actions,
                  private subjectsService: SubjectService) { }
    loadSubjectsComplete$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(SubjectPageActions.loadSubjects),
          mergeMap(() => this.subjectsService.getSubjectsComplete()
            .pipe(
              tap(data => console.log(data)),
              map(subjects => SubjectApiActions.loadSubjectsSuccess({ subjects })),
              catchError(error => of(SubjectApiActions.loadSubjectsFailure({ error })))
            )
          )
        );
    });




}
