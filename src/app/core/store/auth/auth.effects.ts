import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, tap, switchMap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { auth_login, auth_login_success, auth_login_failure, auth_branch_login } from './auth.actions';
import { iUser } from '../../models/user';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { iMenum } from 'src/app/user-admin/models/imenum';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth_login),
      switchMap(user => this.loginService.login(user).pipe(
        tap((user: any) => {
          if (user == undefined) {
            this.store.dispatch(auth_login_failure({ error: 'Login Error' }));
          }
          else {
            const _user: iUser = {
              user_id: user.user_id,
              user_code: user.user_code,
              user_name: user.user_name,
              user_email: user.user_email,
              user_password: '',
              user_token: user.user_token,
              user_company_id: user.user_company_id,
              user_branch_id: user.user_branch_id,
              user_menu_list: [],
              user_rights: []
            }
            this.gs.user = _user;
            this.router.navigate(['/loginBranch'], { queryParams: { 'source': 'login' } });
          }
        }),
        catchError((err) => {
          this.store.dispatch(auth_login_failure({ error: err.error }));
          return of(err.error);
        })
      ))
    )
  }, { dispatch: false });

  branch_login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(auth_branch_login),
      switchMap(search_data => this.loginService.branchLogin(search_data).pipe(
        tap((result: any) => {
          if (result == undefined) {
            this.store.dispatch(auth_login_failure({ error: 'Login Error' }));
          }
          else {
            this.gs.user.user_branch_id = result.branch_id;
            this.gs.user.user_menu_list = <iMenum[]>result.menu_list;
            this.gs.saveAuthState();
            this.store.dispatch(auth_login_success({ user: this.gs.user }));
            this.router.navigate(['/home']);
          }
        }),
        catchError((err) => {
          this.store.dispatch(auth_login_failure({ error: err.error }));
          return of(err.error);
        })
      ))
    )
  }, { dispatch: false });


  constructor(
    private actions$: Actions,
    private gs: GlobalService,
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) { }

}
