import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import { selectIsLogin, selectIsLogout, auth_logout } from '../store/auth/auth.store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = "Cargomar Pvt Ltd";

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store) {

    this.isLoggedIn$ = this.store.select(selectIsLogin).pipe(
      tap(v => console.log(v))
    );
    this.isLoggedOut$ = this.store.select(selectIsLogout).pipe(
      tap(v => console.log(v))
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  logout() {
    this.store.dispatch(auth_logout());
  }


}
