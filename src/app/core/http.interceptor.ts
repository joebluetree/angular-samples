import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { GlobalService } from './services/global.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  totalRequest = 0;

  anonymousApis = [
    'api/Auth/Login'
  ];

  constructor(
    private gs: GlobalService,
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token: any = JSON.parse(localStorage.getItem('token') || '{}');
    let _headers;
    let _request: HttpRequest<unknown>;


    if (token != undefined) {
      _headers = request.headers;
      _headers = _headers.append('Authorization', 'bearer ' + token.user_token)
    }

    let isAllowAnonymous = this.anonymousApis.reduce((acc, value) => {
      let _acc = acc;
      if (request.url.includes(value))
        _acc = true;
      return _acc;
    }, false);

    if (!isAllowAnonymous) {
      if (token != undefined) {
        if (!this.gs.IsValidToken(token)) {
          alert('Token Expired');
          return EMPTY;
        }
      }
    }

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
