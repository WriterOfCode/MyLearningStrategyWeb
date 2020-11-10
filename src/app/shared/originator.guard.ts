import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfilesService } from './services/user-profiles.service';
import { IUserProfile } from './models/user-profile';
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OriginatorGuard implements CanActivate {
  public userProfile: IUserProfile;
  constructor(   private authService: AuthService,
                 private userProfileServce: UserProfilesService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let returnValue: boolean;
      returnValue = false;

      // if ( this.userProfileServce.UserProfile === undefined && !!this.authService.currentLogedInUser) {
      //   this.userProfileServce.getUserProfileExt(
      //     this.authService.currentLogedInUser.homeAccountIdentifier,
      //     this.authService.authenticatonAuthority.tenantDiscoveryResponse.Issuer,
      //     this.authService.currentLogedInUser.preferred_username,
      //     this.authService.currentLogedInUser.name,
      //     )
      //       .subscribe((userDetail: IUserProfile)  => {
      //         this.userProfileServce.UserProfile = userDetail;
      //         console.log('msal:postloginSucess-UserProfile');
      //         console.log(JSON.stringify(this.userProfileServce.UserProfile));
      //       },
      //       (error: any) => {
      //         console.log(`msal:postloginFailed:Unable to obtain profile for logged in user.`);
      //       });
      // }
      if (this.authService.currentLogedInUser  === undefined ||
          this.authService.authenticatonAuthority === undefined ||
          this.authService.currentLogedInUser.homeAccountIdentifier === undefined )
          {
            returnValue = false;
          }

      else if ( this.userProfile  === undefined ) {
        this.userProfileServce.getUserProfileExt(
          this.authService.currentLogedInUser.homeAccountIdentifier,
          this.authService.authenticatonAuthority.tenantDiscoveryResponse.Issuer,
          this.authService.currentLogedInUser.preferred_username,
          this.authService.currentLogedInUser.name,
          )
          .toPromise().then(profile => {
            this.userProfile = profile;
            console.log('msal:postloginSucess-UserProfile');
            console.log(JSON.stringify(this.userProfileServce.UserProfile));
          })
          .catch(error => {
            console.log(`msal:postloginFailed:Unable to obtain profile for logged in user.`);
            console.log(error.json());
          });
      }
      if ( !!this.userProfileServce.UserProfile) {
        returnValue = true;
      }
      return returnValue;
  }


}
