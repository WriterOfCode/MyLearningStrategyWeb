import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StrategiesService } from '../shared/services/strategies.service';
import { StrategyResolved } from '../shared/models/strategy';
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StrategyResolverService implements Resolve<StrategyResolved>  {

  constructor(private strategiesService: StrategiesService,
              private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<StrategyResolved> {
      const StrategyId = route.paramMap.get('StrategyId');
      if (isNaN(+StrategyId)) {
      const message = `StrategyId was not a number: ${StrategyId}`;
      console.error(message);
      return of({ strategy: null, count: 0, error: message });
      }
      if (+StrategyId === 0) {
        return of({ strategy: {
          strategyId: 0,
          userProfileId: this.authService.userProfile.userProfileId,
          name: '',
          description: '',
          sortRuleId: 0,
          questionSelection: 0,
          responseSelection: 0,
          onlyCorrect: false,
          recycleIncorrectlyAnswered:	false,
          lastModifiedOffset: undefined,
          cloudRowId: undefined,
          originator: this.authService.userProfile.originator,
          Summary: ''
        }, count: 1, error: '' });
      }
      return this.strategiesService.getStrategy(this.authService.userProfile.originator, +StrategyId)
      .pipe(
        map(sub => ({ strategy: sub , count: 1})),
        catchError(error => {
          const message = `StrategyResolverService error: ${error}`;
          return of({ strategy: null, count: 0, error: message });
        })
    );
  }
}
