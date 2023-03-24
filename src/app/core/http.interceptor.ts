import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { iUser } from './models/user';
import { LoginService } from './services/login.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  totalRequest = 0;

  anonymousApis = [
    'api/Auth/Login'
  ];

  constructor(
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token: any = JSON.parse(localStorage.getItem('token') || '{}');
    let _headers;
    let _request: HttpRequest<unknown>;

    if (token != undefined) {
      _headers = request.headers.set('Authorization', 'bearer ' + token.token)
    }

    let isAllowAnonymous = this.anonymousApis.reduce((acc, value) => {
      let _acc = acc;
      if (request.url.includes(value))
        _acc = true;
      return _acc;
    }, false);

    if (isAllowAnonymous) {
      _request = request.clone();
    }
    else {
      _request = request.clone({
        headers: _headers
      });
    }

    this.totalRequest++;
    if (this.totalRequest == 1) {
      this.loginService.showScreen();
    }

    return next.handle(_request).pipe(
      finalize(() => {
        this.totalRequest--;
        if (this.totalRequest <= 0)
          this.loginService.hideScreen();
      })
    );

  }
}
