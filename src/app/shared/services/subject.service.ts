import { Injectable, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { API_BASE_URL} from '../config.service';
import { Subject } from '../models/subjects';
import { CompleteSubject  } from '../models/subjects-complete';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) { this.mslBaseApiUrl = baseUrl; }

  getSubjectsComplete(): Observable<CompleteSubject[]> {
    return this.http.get<CompleteSubject[]>(`${this.mslBaseApiUrl}​/api/Subjects/Complete`)
      .pipe(catchError(this.handleError));
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.mslBaseApiUrl}/api/Subjects`)
      .pipe(catchError(this.handleError));
  }
  getSubject(BodyOfKnowledgeId: number): Observable<Subject> {
    if (BodyOfKnowledgeId === 0) {
      return of(this.initializeProduct());
    }
    return this.http.get<Subject>(`${this.mslBaseApiUrl}/api/Subjects/${BodyOfKnowledgeId}`)
    .pipe(catchError(this.onErrorReturnDefault<Subject>( null )));
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.mslBaseApiUrl}/api/Subjects`, subject)
    .pipe(catchError(this.onErrorReturnDefault<Subject>(null )));
  }
  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.mslBaseApiUrl}/api/Subjects`, subject)
    .pipe(catchError(this.onErrorReturnDefault<Subject>( null )));
  }

  deleteSubject(BodyOfKnowledgeId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/Subjects/${BodyOfKnowledgeId}`)
    .pipe(catchError(this.handleError));
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
  private handleError(err) {
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
    console.log(err);
    return throwError(errorMessage);
  }
  initializeProduct(): Subject {
    // Return an initialized object
    return {
      bodyOfKnowledgeId: 0,
      userProfileId: 0,
      name: 'Default',
      description: '',
      keywords: '',
      imageDevice: '',
      imageCloud: '',
      imageHash: 0,
      isShared: false,
      hasBeenShared: false,
      categoryIds: [],
      lastModifiedOffset: undefined,
      cloudRowId: undefined,
    };
  }
}


