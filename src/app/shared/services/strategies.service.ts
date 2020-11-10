import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_BASE_URL} from '../config.service';
import { Strategy } from '../models/strategy';
import { Subject } from '../models/subjects';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class StrategiesService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) { this.mslBaseApiUrl = baseUrl; }

  getStrategies(Originator: Guid): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(`${this.mslBaseApiUrl}/api/LearningStrategies/${Originator}`)
    .pipe(catchError(this.onErrorReturnDefault<Strategy[]>([])));
  }
  getStrategy(Originator: Guid, StrategyId: number): Observable<Strategy> {
    return this.http.get<Strategy>(`${this.mslBaseApiUrl}/api/LearningStrategies/${Originator}/${StrategyId}`)
    .pipe(catchError(this.onErrorReturnDefault<Strategy>(null)));
  }
  addStrategy(strategy: Strategy): Observable<Strategy> {
    return this.http.post<Strategy>(`${this.mslBaseApiUrl}/api/LearningStrategies`, strategy )
    .pipe(catchError(this.onErrorReturnDefault<Strategy>(null)));
  }
  updateStrategy(strategy: Strategy): Observable<Strategy> {
    return this.http.put<Strategy>(`${this.mslBaseApiUrl}/api/LearningStrategies`, strategy)
    .pipe(catchError(this.onErrorReturnDefault<Strategy>(null)));
  }
  deleteStrategy(Originator: Guid, StrategyId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/LearningStrategies/${Originator}/${StrategyId}`)
    .pipe(catchError(this.onErrorReturnDefault<boolean>(false)));
  }
  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.mslBaseApiUrl}/api/Subjects`, subject)
    .pipe(catchError(this.onErrorReturnDefault<Subject>(null )));
  }
  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.mslBaseApiUrl}/api/Subjects`, subject)
    .pipe(catchError(this.onErrorReturnDefault<Subject>( null )));
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param defaultvalue - optional value to return as the observable defaultvalue
   */
  private onErrorReturnDefault<T>( defaultvalue?: T) {
    return (error: any): Observable<T> => {
      return of(defaultvalue as T);
    };
  }
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
