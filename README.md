# MyLearningStrategy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).




    // const token = this.msalService.getCachedTokenInternal(['User.Read',
    // 'User.Read.All',
    // 'profile',
    // 'openid',
    // 'email',
    // 'Mail.Send']).token;
    // let newHeaders = req.headers;
    //   // we append it to our new headers
    // newHeaders = newHeaders.set('Originator', '4d463812-9173-4a6a-b9e9-fd5d860edf42');
    // newHeaders = newHeaders.set('Access-Control-Allow-Origin', '*');
    // newHeaders = newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // newHeaders = newHeaders.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // newHeaders = newHeaders.set('Access-Control-Allow-Credentials', 'true');
    // newHeaders = newHeaders.set('Content-Type', 'application/json');
    // newHeaders = newHeaders.set('Authorization', token);
    //   // Finally we have to clone our request with our new headers
    //   // This is required because HttpRequests are immutable
    // const authReq = req.clone({headers: newHeaders});
    //   // Then we return an Observable that will run the request
    //   // or pass it to the next interceptor if any
    // req = req.clone({
    //     setHeaders: {
    //         Authorization: 'Bearer ' + token,
    //     }
    // });
    // return next.handle(authReq);



  // postlogIn(payload: any): void {
  //     // Getting login sucess here and giving call for token
  //     // this.userToken = this.msalService.acquireTokenSilent(
  //     //   [ 'user.read', 'openid', 'profile', 'mail.send', 'api://3a9d7ec0-ae2c-49c4-8db3-ffb7bdd864d6/access_as_user'],
  //     //   'https://login.microsoftonline.com/ebcc5e07-fc92-4998-8680-c6bbc27b8108', this.user
  //     //   ).catch((reason) => {
  //     //     this.alertsService.add('danger', 'Get token failed', JSON.stringify(reason, null, 2));
  //     //   });
  //     // this.userProfileResolved = this.userProfileServce.getUserProfileExt(
  //     //   this.msalService.getUser().userIdentifier,
  //     //   this.msalService.getUser().identityProvider)
  //     // .pipe(
  //     //   map(userprofile => ({ userProfile: userprofile })),
  //     //   tap(userprofile => (console.log(JSON.stringify(userprofile)))),
  //     //   catchError(error => {
  //     //     this.loggedIn = false;
  //     //     console.log('msal:postlogInFailure:Unable to obtain User Profile.');
  //     //     const message = `Retrieval error: ${error}`;
  //     //     return of({ uaerProfile: null, error: message });
  //     //   })
  //     // );


  //     this.loggedIn = true;
  //     this.user = this.msalService.getUser();
  //     console.log('msal:postlogIn:User Is');
  //     console.log(JSON.stringify(this.user));

  //     console.log('msal:postlogIn:Get User Profile');
  //     this.userProfileServce.getUserProfileExt(
  //         this.msalService.getUser().userIdentifier,
  //         this.msalService.getUser().identityProvider)
  //       .subscribe(userprofile => (this.userProfile = userprofile),
  //       (error: any) => { this.loggedIn = false;
  //                         console.log('msal:postlogInFailure:Unable to obtain User Profile.');
  //                         console.log(JSON.stringify(error));
  //       });

  //     this.user = this.msalService.getUser();
  //     if (this.userProfile === undefined) {
  //       console.log('msal:postlogIn:UserProfileNotFound');
  //       const newUserProfile = new  UserProfile();
  //       newUserProfile.DisplayName = this.msalService.getUser().displayableId,
  //       newUserProfile.ExternalID = this.msalService.getUser().userIdentifier,
  //       newUserProfile.IdentityProvider = this.msalService.getUser().identityProvider;
  //       newUserProfile.HasLoggedIn = true;
  //       newUserProfile.IsLocked = false;
  //       newUserProfile.IsDisabled = false;
  //       newUserProfile.IsDeleted = false;
  //       console.log('msal:postlogIn:UserProfileToCreate');
  //       console.log(JSON.stringify(newUserProfile));

  //       this.userProfileServce.addUserProfile(newUserProfile)
  //       .subscribe(userprofile => (this.userProfile = userprofile),
  //       (error: any) => { this.loggedIn = false;
  //                         console.log('msal:postlogInFailure:Unable to obtain User Profile.');
  //                         console.log(JSON.stringify(error));
  //       });

  //       if (this.userProfile !== undefined) {
  //         console.log('msal:postloginSuccess:NewUserCreated');
  //         console.log(JSON.stringify(this.userProfile));
  //         console.log('msal:postloginSuccess:UserProfileRetrieved');
  //       } else{
  //         console.log('msal:postloginFailed:Unable to obtain profile for logged in user.');
  //       }
  //     } else {
  //       console.log('msal:postlogInSucess:User Profile is');
  //       console.log(JSON.stringify(this.userProfile));
  //     }
  // }
