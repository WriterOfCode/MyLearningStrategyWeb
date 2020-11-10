import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable()
export class OriginatorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.userProfile === undefined) {
      // this.authService.getUserProfile();
      return next.handle(req.clone());
    }
    req = req.clone({
        setHeaders: {
          Originator: this.authService.userProfile.originator.toString(),
          'user-originator': this.authService.userProfile.originator.toString(),
          'Content-Type':  'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*'
        }
    });
    console.log("this.authService.userProfile.originator");
    console.log(this.authService.userProfile.originator);
    console.log(JSON.stringify(req));
    return next.handle(req);
  }
}
