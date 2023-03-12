import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { auth_login } from '../store/auth/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private store: Store) {
    this.loginForm = new FormGroup({
      code: new FormControl('Samantha'),
      password: new FormControl('Samantha')
    })
  }

  login() {
    this.store.dispatch(auth_login(this.loginForm.value))
  }

}
