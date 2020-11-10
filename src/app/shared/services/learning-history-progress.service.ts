import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LearningHistoryProgress} from '../models/learning-history-progress';
import { API_BASE_URL} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class LearningHistoryProgressService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) { this.mslBaseApiUrl = baseUrl; }


  addLearningHistoryProgress(learningProgress: LearningHistoryProgress): Observable<LearningHistoryProgress> {
    return this.http.post<LearningHistoryProgress>(`${this.mslBaseApiUrl}/api/LearningHistoryProgress`, learningProgress )
    .pipe(catchError(this.onErrorReturnDefault<LearningHistoryProgress>(null)));
  }
  updateLearningHistoryProgress(learningProgress: LearningHistoryProgress): Observable<LearningHistoryProgress> {
    return this.http.put<LearningHistoryProgress>(`${this.mslBaseApiUrl}/api/LearningHistoryProgress`, learningProgress)
    .pipe(catchError(this.onErrorReturnDefault<LearningHistoryProgress>(null)));
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
}
