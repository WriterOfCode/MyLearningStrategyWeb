import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { StrategiesService } from '../shared/services/strategies.service';
import { StrategiesResolved } from '../shared/models/strategy';
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StrategiesResolverService  implements Resolve<StrategiesResolved> {
  constructor(private strategiesService: StrategiesService,
              private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<StrategiesResolved> {
      return this.strategiesService.getStrategies( this.authService.userProfile.originator)
      .pipe(
        map(sub => ({ strategy: sub , count: 1})),
        catchError(error => {
          const message = `StrategiesResolverService error: ${error}`;
          return of({ strategy: null, count: 0, error: message });
        })
    );
  }
}
