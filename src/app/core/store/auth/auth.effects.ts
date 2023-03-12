import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { auth_login, auth_login_success } from './auth.store';
import { iUser } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth_login),
      switchMap(user => this.loginService.login(user)),
      tap((user: any) => {
        const _user: iUser = {
          user_id: user.id,
          user_code: user.username,
          user_name: user.name,
          user_email: user.email,
          user_password: ''
        }
        this.store.dispatch(auth_login_success({ user: _user }));
        this.router.navigate(['/home']);

      })
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) { }

}
