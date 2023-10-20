import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { auth_login_success } from './core/store/auth.actions';
import { GlobalService } from './core/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';

  constructor(
    private router: Router,
    private gs: GlobalService,
    private store: Store) {
  }

  ngOnInit(): void {
    if (this.gs.readAuthState())
      this.store.dispatch(auth_login_success({ user: this.gs.user }));
  }

}
