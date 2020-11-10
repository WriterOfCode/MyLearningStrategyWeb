import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StrategyApiActions, StrategyPageActions } from './actions/strategy-actions-index';
import { StrategiesService } from '../../shared/services/strategies.service';
import { AuthService } from '../../shared/auth/auth.service';


@Injectable()
export class StrategyEffects {

  constructor(private actions$: Actions,
              private strategiesService: StrategiesService,
              private authService: AuthService) { }

    loadStrategies$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(StrategyPageActions.loadStrategies),
          mergeMap(() => this.strategiesService.getStrategies(this.authService.userProfile.originator)
            .pipe(
              tap(data => console.log(data)),
              map(strategy => StrategyApiActions.loadStrategiesSuccess({ strategy })),
              catchError(error => of(StrategyApiActions.loadStrategiesFailure({ error })))
            )
          )
        );
    });

    updateStrategy$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(StrategyPageActions.updateStrategy),
          concatMap(action =>
            this.strategiesService.updateStrategy(action.strategy)
              .pipe(
                tap(str => console.log(str)),
                map(strategy => StrategyApiActions.updateStrategySuccess({ strategy })),
                catchError(error => of(StrategyApiActions.updateStrategyFailure({ error })))
              )
            )
        );
    });

    createStrategy$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(StrategyPageActions.createStrategy),
          concatMap(action =>
            this.strategiesService.addStrategy(action.strategy)
              .pipe(
                map(strategy => StrategyApiActions.createStrategySuccess ({ strategy })),
                catchError(error => of(StrategyApiActions.createStrategyFailure({ error })))
              )
            )
          );
    });

    deleteStrategy$ = createEffect(() => {
    return this.actions$
    .pipe(
        ofType(StrategyPageActions.deleteStrategy),
          mergeMap(action =>
            this.strategiesService.deleteStrategy(this.authService.userProfile.originator,
              action.strategyId).pipe(
              map(() => StrategyApiActions.deleteStrategySuccess({ strategyId: action.strategyId })),
              catchError(error => of(StrategyApiActions.deleteStrategyFailure ({ error })))
            )
          )
        );
    });
}
