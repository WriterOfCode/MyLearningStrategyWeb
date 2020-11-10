import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Questions } from '../models/questions';
import { API_BASE_URL} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {this.mslBaseApiUrl = baseUrl;  }

  getQuestions(): Observable<Questions[]> {
    return this.http.get<Questions[]>(`${this.mslBaseApiUrl}/api/Questions/`)
    .pipe(catchError(this.onErrorReturnDefault<Questions[]>([])));
  }

  //  /api/Questions/{BodyOfKnowledgeId}/{QuestionId}
  getQuestionsBySubject(subjectId: number): Observable<Questions[]> {
    return this.http.get<Questions[]>(`${this.mslBaseApiUrl}/api/Questions/${subjectId}`)
    .pipe(catchError(this.onErrorReturnDefault<Questions[]>([])));
  }

  // /api/Questions/{BodyOfKnowledgeId}/{QuestionId}
  getQuestion(subjectId: number, questionId: number): Observable<Questions> {
    if (questionId === 0) {
      return of(this.initilizeQuetion(subjectId));
    }
    return this.http.get<Questions>(`${this.mslBaseApiUrl}/api/Questions/${subjectId}/${questionId}`)
    .pipe(catchError(this.onErrorReturnDefault<Questions>(null)));
  }


  // /api/Questions/{BodyOfKnowledgeId}/{QuestionId}
  deleteQuestion(subjectId: number, questionId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/Questions/` + JSON.stringify(subjectId) + `/` + JSON.stringify(questionId))
    .pipe(catchError(this.onErrorReturnDefault<boolean>(false)));
  }

  // /api/Questions/{BodyOfKnowledgeId}/{QuestionId}
  addQuestion(question: Questions): Observable<Questions> {
    return this.http.post<Questions>(`${this.mslBaseApiUrl}/api/Questions/`, question)
    .pipe(catchError(this.onErrorReturnDefault<Questions>(null)));
  }

  // /api/Questions/{BodyOfKnowledgeId}/{QuestionId}
  updateQuestion( question: Questions): Observable<Questions> {
    return this.http.put<Questions>(`${this.mslBaseApiUrl}/api/Questions/`, question)
    .pipe(catchError(this.onErrorReturnDefault<Questions>(null)));
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * param defaultvalue - optional value to return as the observable defaultvalue
   */
  private onErrorReturnDefault<T>( defaultvalue?: T) {
    return (error: any): Observable<T> => {
      return of(defaultvalue as T);
    };
  }

  private initilizeQuetion(subjectId: number): Questions {
    return {
      questionId: 0,
      bodyOfKnowledgeId: subjectId,
      orderBy: 1,
      question:	' ',
      image_1_Device:	'',
      image_1_Cloud:	'',
      image_1_Hash: 0,
      image_2_Device:	'',
      image_2_Cloud:	'',
      image_2_Hash: 0,
      image_3_Device:	'',
      image_3_Cloud:	'',
      image_3_Hash: 0,
      hyperlink_1:	'',
      hyperlink_2:	'',
      hyperlink_3:	'',
      mnemonic:	'',
      lastModifiedOffset:	undefined,
      cloudRowId:	undefined
    };
  }


}
