import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUserProfile } from '../models/user-profile';
import { API_BASE_URL} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {
  mslBaseApiUrl = '';
  private userProfile: IUserProfile;
  public get UserProfile(): IUserProfile {
    return this.userProfile;
  }
  public set UserProfile(v: IUserProfile) {
    this.userProfile = v;
  }
  constructor(private http: HttpClient, @Inject(API_BASE_URL) baseUrl: string) {this.mslBaseApiUrl = baseUrl; }

  getUserProfileExt(userIdentifier: string, identityProviders: string, displayableId: string, name: string): Observable<IUserProfile> {
    if (this.UserProfile) {
      return of(this.UserProfile);
    }
    // displayableId: string;
    // name: string;
    // identityProvider: string;
    // userIdentifier: string;

    const paramiters = new HttpParams()
    .set('ExternalID', userIdentifier)
    .set('IdentityProvider', identityProviders)
    .set('DisplayName', displayableId)
    .set('FirstName', name);

    return this.http.get<IUserProfile>(
      `${this.mslBaseApiUrl}/api/UserProfiles`, {params: paramiters})
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.UserProfile = data),
        catchError(this.handleError)
        );
  }
  addUserProfile(userProfile: IUserProfile): Observable<IUserProfile> {
    return this.http.post<IUserProfile>(`${this.mslBaseApiUrl}/api/UserProfiles`, userProfile )
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      tap(data => this.UserProfile = data),
      catchError(this.handleError));
  }
  updateUserProfile(userProfile: IUserProfile): Observable<IUserProfile> {
    this.UserProfile = undefined;
    return this.http.put<IUserProfile>(`${this.mslBaseApiUrl}/api/UserProfiles`, userProfile)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      tap(data => this.UserProfile = data),
      catchError(this.handleError));
  }
  private onErrorReturnDefault<T>( defaultvalue?: T) {
    return (error: any): Observable<T> => {
      return of(defaultvalue as T);
    };
  }
  handleError(error: { error: { message: any; }; status: any; message: any; }) {
    alert(JSON.stringify(error.error.message));
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
