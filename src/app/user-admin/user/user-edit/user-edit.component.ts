import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { iUserm } from '../../models/iuserm';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { user_upsert_row } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.reducer';
import { iBranchm } from '../../models/ibranchm';
import { iUserBranches } from '../../models/iuserbranches';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  id = 0;
  menuid = '';
  title = '';
  type = '';

  showModel = true;

  mform: FormGroup;
  theFormArray: any;
  constructor(
    private gs: GlobalService,
    private service: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<UserState>
  ) {
    this.theFormArray = new FormArray([]);
    this.mform = this.fb.group({
      user_id: [0],
      user_code: ['', [Validators.required, Validators.maxLength(20)]],
      user_name: ['', [Validators.required, Validators.maxLength(60)]],
      user_password: ['', [Validators.required, Validators.maxLength(20)]],
      user_email: ['', [Validators.required, Validators.maxLength(60)]],
      user_is_admin: ['N'],
      rec_branch_id: [0, [Validators.required]],
      rec_branch_name: ['', [Validators.required]],
      userbranches: this.fb.array([]),
    })
  }

  addRow(rec: iUserBranches) {
    return this.fb.group({
      ub_id: [rec ? rec.ub_id : 0],
      ub_user_id: [rec ? rec.ub_user_id : 0],
      rec_branch_id: [rec ? rec.rec_branch_id : 0],
      rec_branch_name: [{ value: rec ? rec.rec_branch_name : '', disabled: true }],
      ub_selected: [rec ? rec.ub_selected : 'N'],
    })
  }


  ngOnInit() {
    this.id = 0;
    this.route.queryParams.forEach(rec => {
      this.id = +rec["id"];
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
    })
    this.getRecord();
  }

  get formArray(): FormArray {
    return this.mform.get("userbranches") as FormArray;
  }


  getRecord() {
    if (this.id <= 0)
      return;

    this.service.getRecord(this.gs.user.user_company_id, this.id).subscribe({
      next: (rec) => {


        this.mform.patchValue({
          user_id: rec.user_id,
          user_code: rec.user_code,
          user_name: rec.user_name,
          user_password: rec.user_password,
          user_email: rec.user_email,
          user_is_admin: rec.user_is_admin,
          rec_branch_id: rec.rec_branch_id,
          rec_branch_name: rec.rec_branch_name,
        });
        rec.userbranches.forEach(rec => {
          this.formArray.push(this.addRow(rec))
        });

      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }

  getControl(ctrlName: string) {
    return this.mform.controls[ctrlName];
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iUserm>this.mform.value;

    if (data.user_id == null)
      data.user_id = 0;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (rec: iUserm) => {
        if (data.user_id == 0) {
          this.id = rec.user_id;
          data.user_id = this.id;
          this.mform.patchValue({ user_id: this.id });

          this.formArray.clear();
          rec.userbranches.forEach(rec => {
            this.formArray.push(this.addRow(rec))
          });

          const param = {
            id: this.id.toString()
          };

          this.gs.updateURL(param);

        };
        this.store.dispatch(user_upsert_row({ record: rec }));

        this.gs.showScreen(["Save Complete"]);

      },
      error: (e) => {
        this.gs.showScreen([e.error]);
      },
      complete: () => { }

    })
  }

  callBack(action: { id: string, rec: iBranchm }) {

    if (action.id == 'rec_branch_name') {

      this.mform.patchValue({
        rec_branch_id: action.rec ? action.rec.branch_id : 0,
        rec_branch_name: action.rec ? action.rec.branch_name : '',
      })

    }
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  return2Parent() {
    this.location.back();
  }

}
