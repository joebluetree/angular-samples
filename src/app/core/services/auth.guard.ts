import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GlobalService } from './global.service';
import { Store } from '@ngrx/store';
import { selectIsLogin, selectIsLogout } from '../store/auth/auth.selectors';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store,
    private gs: GlobalService) {
    this.isLoggedIn$ = this.store.select(selectIsLogin);
  }



  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //your logic goes here
    return this.store.select(selectIsLogin).pipe(
      map(flag => {
        if (!flag) {
          this.gs.logout();
        }
        return flag;
      })
    )
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthService).canActivate(next, state);
}

