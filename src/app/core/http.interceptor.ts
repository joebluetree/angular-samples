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

/*
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }
]
*/

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  totalRequest = 0;

  anonymousApis = [
    'api/auth/login',
    'api/auth/GetBranchListAsync',
    'api/auth/BranchLoginAsync'
  ];

  constructor(
    private gs: GlobalService,
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.gs.getToken();

    let _headers;
    let _request: HttpRequest<unknown>;


    if (token != '') {
      _headers = request.headers;
      _headers = _headers.append('Authorization', 'bearer ' + token)
    }

    let isAllowAnonymous = this.anonymousApis.reduce((acc, value) => {
      let _acc = acc;
      if (request.url.includes(value))
        _acc = true;
      return _acc;
    }, false);

    if (!isAllowAnonymous) {
      if (token != '') {
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
