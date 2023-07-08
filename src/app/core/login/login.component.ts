import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { auth_login, auth_login_failure } from '../store/auth/auth.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.store';
import { selectLoginError } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError$: Observable<String | undefined>
  loginForm: FormGroup;

  constructor(private store: Store<AuthState>, private router: Router) {
    this.loginError$ = this.store.select(selectLoginError)
    this.loginForm = new FormGroup({
      code: new FormControl('joy'),
      password: new FormControl('joy123')
    })
  }

  login() {
    this.store.dispatch(auth_login(this.loginForm.value))
  }

  cancel() {
    this.store.dispatch(auth_login_failure({ error: '' }))
    this.loginForm.reset();
    this.loginForm.setValue({
      code: '',
      password: ''
    })
  }

}
