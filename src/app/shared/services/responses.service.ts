import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Responses} from '../models/response';
import { API_BASE_URL} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {this.mslBaseApiUrl = baseUrl; }

  getAllResponses(): Observable<Responses[]> {
    return this.http.get<Responses[]>(`${this.mslBaseApiUrl}/api/Responses`)
    .pipe(catchError(this.onErrorReturnDefault<Responses[]>([])));
  }
  getSubjectResponses(BodyOfKnowledgeId: number): Observable<Responses> {
    return this.http.get<Responses>(`${this.mslBaseApiUrl}/api/Responses/BySubject/${BodyOfKnowledgeId}`)
    .pipe(catchError(this.onErrorReturnDefault<Responses>(null)));
  }
  getQuestionResponses(QuestionID: number): Observable<Responses[]> {
    return this.http.get<Responses[]>(`${this.mslBaseApiUrl}/api/Responses/ByQuestion/${QuestionID}`)
    .pipe(catchError(this.onErrorReturnDefault<Responses[]>(null)));
  }

  getResponse(questionId: number, responseId: number): Observable<Responses> {
    if (responseId === 0) {
      return of(this.initilizeResponse(questionId));
    }
    return this.http.get<Responses>(`${this.mslBaseApiUrl}/api/Responses/ByResponse/${responseId}`)
    .pipe(catchError(this.onErrorReturnDefault<Responses>(null)));
  }

  addResponse(response: Responses): Observable<Responses> {
    return this.http.post<Responses>(`${this.mslBaseApiUrl}/api/Responses`, response )
    .pipe(catchError(this.onErrorReturnDefault<Responses>(null)));
  }
  updateResponse(response: Responses): Observable<Responses> {
    return this.http.put<Responses>(`${this.mslBaseApiUrl}/api/Responses`, response)
    .pipe(catchError(this.onErrorReturnDefault<Responses>(null)));
  }
  deleteAResponse(questionId: number, responseId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/Responses/${questionId}/${responseId}`)
    .pipe( catchError(this.onErrorReturnDefault<boolean>(false)));
  }

  deleteQuestionResponses(questionId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/Responses/${questionId}`)
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

  private initilizeResponse(questionsId: number): Responses {
    return {
      responseId: 0,
      questionId: questionsId,
      orderBy: 1,
      response:	'',
      isCorrect:	true,
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
