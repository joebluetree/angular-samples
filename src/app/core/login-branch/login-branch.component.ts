import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-branch',
  templateUrl: './login-branch.component.html',
  styleUrls: ['./login-branch.component.css']
})
export class LoginBranchComponent {

  mForm: FormGroup;

  constructor(private router: Router) {

    this.mForm = new FormGroup({
      branch_id: new FormControl(0),
    })
  }

  login() {

  }

  cancel() {

  }

}
