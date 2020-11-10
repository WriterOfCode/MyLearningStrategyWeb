import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuestionCategories} from '../models/questions-categories';
import { API_BASE_URL} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsCategoriesService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) { this.mslBaseApiUrl = baseUrl; }

  getQCategories(): Observable<QuestionCategories[]> {
    return this.http.get<QuestionCategories[]>(`${this.mslBaseApiUrl}/api/QuestionsCategories`)
    .pipe(catchError(this.onErrorReturnDefault<QuestionCategories[]>([])));
  }
  getQCategory(questionId: number, categoryId: number): Observable<QuestionCategories> {
    return this.http.get<QuestionCategories>(`${this.mslBaseApiUrl}/api/QuestionsCategories/${questionId}/${categoryId}`)
    .pipe(catchError(this.onErrorReturnDefault<QuestionCategories>(null)));
  }
  addQCategory(questionCategories: QuestionCategories): Observable<QuestionCategories> {
    return this.http.post<QuestionCategories>(`${this.mslBaseApiUrl}/api/QuestionsCategories`, questionCategories )
    .pipe(catchError(this.onErrorReturnDefault<QuestionCategories>(null)));
  }
  updateQCategory(questionCategories: QuestionCategories): Observable<QuestionCategories> {
    return this.http.put<QuestionCategories>(`${this.mslBaseApiUrl}/api/QuestionsCategories`, questionCategories)
    .pipe(catchError(this.onErrorReturnDefault<QuestionCategories>(null)));
  }
  deleteQCategory(QuestionId: number, CategoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/QuestionsCategories/${QuestionId}/${CategoryId}`)
    .pipe(catchError(this.onErrorReturnDefault<boolean>(false)));
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
