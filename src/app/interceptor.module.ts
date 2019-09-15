import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocalStorageService} from './services/localStorage/local-storage.service';
import {Token} from './interfaces/Token';
import * as moment from 'moment';
import {SnackBarService} from './services/snackBar/snack-bar.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private snackBarService: SnackBarService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.getAuthToken();

    if (!authToken) {
      return next.handle(req);
    }

    const dateExp = moment.unix(authToken.exp);
    const today = moment();

    if (dateExp.isBefore(today)) {
      this.snackBarService.show('Your session has expired').subscribe(
        () =>
          this.router
            .navigateByUrl('/login')
            .catch(console.error)
      );
      this.localStorageService.removeAuthToken();
      return next.handle(req);
    } else {
      const dupReq = req.clone({headers: req.headers.set('authorization', `Bearer ${authToken.token}`)});
      return next.handle(dupReq);
    }
  }
}

@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true}
  ]
})
export class InterceptorModule {
}
