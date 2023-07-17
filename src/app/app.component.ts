import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { iUser } from './core/models/user';
import { Store } from '@ngrx/store';
import { auth_login_success } from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';

  constructor(router: Router,
    private store: Store) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let user = JSON.parse(localStorage.getItem('token') || '{}');
      const _user: iUser = {
        user_id: user.user_id,
        user_code: user.user_code,
        user_name: user.user_name,
        user_email: user.user_email,
        user_company_id: user.user_company_id,
        user_branch_id: user.user_branch_id,
        user_password: ''
      }
      this.store.dispatch(auth_login_success({ user: _user }));
    }
  }


}
