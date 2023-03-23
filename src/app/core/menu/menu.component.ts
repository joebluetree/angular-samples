import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { auth_logout } from '../store/auth/auth.actions';
import { CoreState, selectIsLogin, selectIsLogout, selectUserName } from '../store/index';

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
    private store: Store<CoreState>,
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
