import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, auth_login, selectLoginError, auth_login_failure } from '../store/auth/auth.store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
      code: new FormControl('Samantha'),
      password: new FormControl('Samantha')
    })

  }

  login() {
    this.store.dispatch(auth_login(this.loginForm.value))
  }

  cancel() {
    this.store.dispatch(auth_login_failure({ error: undefined }))
    this.loginForm.reset();
    this.loginForm.setValue({
      code: '',
      password: ''
    })
  }

}
