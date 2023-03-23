import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, tap, switchMap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { auth_login, auth_login_success, auth_login_failure } from './auth.actions';
import { iUser } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth_login),
      switchMap(user => this.loginService.login(user).pipe(
        tap((user: any) => {
          console.log("tap Error ", user);
          if (user == undefined) {
            this.store.dispatch(auth_login_failure({ error: 'Login Error' }));
          }
          else {
            console.log(user);
            const _user: iUser = {
              user_id: user.user_id,
              user_code: user.user_code,
              user_name: user.user_name,
              user_email: user.user_email,
              user_password: ''
            }
            this.store.dispatch(auth_login_success({ user: _user }));
            this.router.navigate(['/home']);
          }
        }),
        catchError((err) => {
          console.log("catch error ", err);
          this.store.dispatch(auth_login_failure({ error: err.error }));
          return of(err.error);
        })
      ))
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) { }

}
