import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLogin, selectIsLogout, auth_logout, selectUserName, AuthState } from '../store/auth/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = "Cargomar Pvt Ltd";

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  userName$: Observable<string | undefined>;

  constructor(
    private store: Store<AuthState>,
    private router: Router
  ) {

    this.isLoggedIn$ = this.store.select(selectIsLogin);
    this.isLoggedOut$ = this.store.select(selectIsLogout);
    this.userName$ = this.store.select(selectUserName);



  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.store.dispatch(auth_logout());
    this.router.navigate(['login']);
  }


}
