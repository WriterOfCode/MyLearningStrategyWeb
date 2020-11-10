import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils, LogLevel } from 'msal';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IUserProfile } from '../models/user-profile';
import { UserProfilesService } from './user-profiles.service';
import { AlertsService } from '../alerts.service';
import { isIE, b2cPolicies } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  OnDestroy  {
  isIframe = false;
  // loggedIn = false;
  private isLoading$ = new BehaviorSubject<boolean>(true);
  private isLoggedIn$ =  new BehaviorSubject<boolean>(false);
  get loading$() { return this.isLoading$.asObservable(); }
  get loggedIn$() { return this.isLoggedIn$.asObservable(); }

  private subscription: Subscription;
  public currentLogedInUser: any;
  public userToken: any;
  public authenticatonAuthority;
  public userProfile: IUserProfile;

  constructor(private broadcastService: BroadcastService ,
              private msalService: MsalService,
              private userProfileServce: UserProfilesService,
              private alertsService: AlertsService) {

        this.broadcastService.subscribe('msal:loginSuccess', (success) => {
          console.log('msal:loginSuccess: id token acquired at: ' + new Date().toString());
          console.log(success);
          // We need to reject id tokens that were not issued with the default sign-in policy.
          // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
          // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
          if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
            window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
            return this.msalService.logout();
          }
          else if (success.idToken.claims.tfp === b2cPolicies.names.resetPassword) {
            window.alert("Password has been reset successfully. \nPlease sign-in with your new password");
            return this.msalService.logout();
          }
          console.log('login succeeded. id token acquired at: ' + new Date().toString());
          console.log(success);
          this.checkAccount();
          this.getUserProfile();
        });

        this.broadcastService.subscribe('msal:loginFailure', (error) => {
          console.log(`msal:loginFailure`);
          console.log(JSON.stringify(error));
          this.alertsService.add('Log in failure', 'Log in failure', error.errorMessage);
            // Check for forgot password error
            // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
          if (error.errorMessage.indexOf('AADB2C90118') > -1) {
            if (isIE) {
              this.msalService.loginRedirect(b2cPolicies.authorities.resetPassword);
            } else {
              this.msalService.loginPopup(b2cPolicies.authorities.resetPassword);
            }
          }
          else {
            this.logOut();
            this.alertsService.add('Log in failure', 'Log in failure', error);
          }
        });

        // redirect callback for redirect flow (IE)
        this.msalService.handleRedirectCallback((authError, response) => {
          if (authError) {
            console.error('Redirect Error: ', authError.errorMessage);
            // this.isLoggedIn$.next(false);
            this.alertsService.add('Log in Redirect Error', 'Log in failure', authError.errorMessage);
          }
          console.log('Redirect Success: ', response);
        });

        this.msalService.setLogger(new Logger((logLevel, message, piiEnabled) => {
          console.log('msal:Logging ', message);
        }, {
          level: LogLevel.Verbose,
          correlationId: CryptoUtils.createNewGuid(),
          piiLoggingEnabled: false
        }));
  }

  getUserProfile() {
    if ( this.userProfile  === undefined ) {
      this.userProfileServce.getUserProfileExt(
        this.currentLogedInUser.homeAccountIdentifier,
        this.authenticatonAuthority.tenantDiscoveryResponse.Issuer,
        this.currentLogedInUser.preferred_username,
        this.currentLogedInUser.name,
        )
        .toPromise().then(profile => {
          this.userProfile = profile;
          console.log('msal:postloginSucess-UserProfile');
          console.log(JSON.stringify(this.userProfileServce.UserProfile));
        });
    }
  }

  checkAccount() {
    this.currentLogedInUser = this.msalService.getAccount();
    this.authenticatonAuthority = this.msalService.getAuthorityInstance();
    this.isLoggedIn$.next( !!this.msalService.getAccount());
  }

  login() {
    if (isIE) {
      this.msalService.loginRedirect();
    } else {
      this.msalService.loginPopup();
    }
    this.isLoggedIn$.next(true);
  }

  logOut() {
    this.msalService.logout();
    this.isLoggedIn$.next(false);
  }

  editProfile() {
    if (isIE) {
      this.msalService.loginRedirect(b2cPolicies.authorities.editProfile);
    } else {
      this.msalService.loginPopup(b2cPolicies.authorities.editProfile);
    }
  }

  ngOnDestroy() {
    this.msalService.logout();
    this.isLoggedIn$.next(false);
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
