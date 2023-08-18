import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { LoginService } from '../services/login.service';
import { iBranchm } from 'src/app/user-admin/models/ibranchm';
import { AuthState } from '../store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { auth_branch_login } from '../store/auth/auth.actions';
import { selectLoginError } from '../store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-branch',
  templateUrl: './login-branch.component.html',
  styleUrls: ['./login-branch.component.css']
})
export class LoginBranchComponent {

  source = '';
  mForm: FormGroup;

  records: iBranchm[] = [];

  loginError$: Observable<String | undefined>


  constructor(
    private store: Store<AuthState>,
    private gs: GlobalService,
    private router: Router,
    private mainService: LoginService,
    private route: ActivatedRoute) {

    this.mForm = new FormGroup({
      branch_id: new FormControl(this.gs.user.user_branch_id),
    })

    this.loginError$ = this.store.select(selectLoginError)

    this.route.queryParams.forEach(rec => {
      this.source = rec["source"];
    })
    this.loadRecords();
  }

  loadRecords() {

    const search_record = {
      company_id: this.gs.user.user_company_id,
      user_id: this.gs.user.user_id
    }
    this.mainService.loadBranches(search_record).subscribe({
      next: (v) => {
        this.records = v.records;
      },
      error: (e) => {
        this.gs.showScreen([e.error]);
      }
    })
  }

  login() {
    if (!this.mForm.value.branch_id)
      return;
    this.loginBranch(this.mForm.value.branch_id);
  }

  loginBranch(branch_id: number) {
    const data = {
      company_id: this.gs.user.user_company_id,
      branch_id: branch_id,
      user_id: this.gs.user.user_id,
    }
    this.store.dispatch(auth_branch_login(data));
  }

  cancel() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
