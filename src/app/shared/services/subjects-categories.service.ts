import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubjectsCategories } from '../models/subjects-category';
import { API_BASE_URL} from '../config.service';


@Injectable({
  providedIn: 'root'
})
export class SubjectsCategoriesService {
  mslBaseApiUrl = '';

  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {this.mslBaseApiUrl = baseUrl; }

  getSubjectsCategory(): Observable<SubjectsCategories[]> {
    return this.http.get<SubjectsCategories[]>(`${this.mslBaseApiUrl}/api/SubjectsCategories`)
    .pipe(catchError(this.onErrorReturnDefault<SubjectsCategories[]>([])));
  }
  getSubjectCateies(BodyOfKnowledgeId: number, CategoryId: number): Observable<SubjectsCategories> {
    return this.http.get<SubjectsCategories>(`${this.mslBaseApiUrl}/api/SubjectsCategories/${BodyOfKnowledgeId}/${CategoryId}`)
    .pipe(catchError(this.onErrorReturnDefault<SubjectsCategories>(null)));
  }
  addSubjectCategory(subject: SubjectsCategories): Observable<SubjectsCategories> {
    return this.http.post<SubjectsCategories>(`${this.mslBaseApiUrl}/Subjects`, subject )
    .pipe(catchError(this.onErrorReturnDefault<SubjectsCategories>(null)));
  }
  updateSubjectCategory(subject: SubjectsCategories): Observable<SubjectsCategories> {
    return this.http.put<SubjectsCategories>(`${this.mslBaseApiUrl}/Subjects`, subject)
    .pipe(catchError(this.onErrorReturnDefault<SubjectsCategories>(null)));
  }
  deleteSubjectCategory(BodyOfKnowledgeId: number, Category): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/Subjects/${BodyOfKnowledgeId}`)
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
