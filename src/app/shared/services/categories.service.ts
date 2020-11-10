import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category';
import { API_BASE_URL} from '../config.service';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  mslBaseApiUrl = '';
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {this.mslBaseApiUrl = baseUrl; }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.mslBaseApiUrl}/api/Categories`)
    .pipe(catchError(this.onErrorReturnDefault<Category[]>([])));
  }
  // getCategory(CategoryId: number): Observable<Category> {
  //   return this.http.get<Category>(`${this.mslBaseApiUrl}/api/Categories/${CategoryId}`)
  //   .pipe(catchError(this.onErrorReturnDefault<Category>(null)));
  // }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.mslBaseApiUrl}/api/Categories`, category )
    .pipe(catchError(this.onErrorReturnDefault<Category>(null)));
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.mslBaseApiUrl}/api/Categories`, category)
    .pipe(catchError(this.onErrorReturnDefault<Category>(null)));
  }
  deleteCategory(CategoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mslBaseApiUrl}/api/Categories/${CategoryId}`)
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
