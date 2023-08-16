import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { iUserm } from '../../models/iuserm';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { user_upsert_row } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.reducer';

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
  constructor(
    private gs: GlobalService,
    private service: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<UserState>
  ) {
    this.mform = this.fb.group({
      user_id: [0],
      user_code: ['', [Validators.required, Validators.maxLength(20)]],
      user_name: ['', [Validators.required, Validators.maxLength(60)]],
      user_password: ['', [Validators.required, Validators.maxLength(20)]],
      user_email: ['', [Validators.required, Validators.maxLength(60)]],
      user_is_admin: ['Y'],
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

  getRecord() {
    if (this.id <= 0)
      return;
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        this.mform.setValue({
          user_id: rec.user_id,
          user_name: rec.user_name,
          user_password: rec.user_password,
          user_email: rec.user_email,
          user_is_admin: rec.user_is_admin,

        })
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
      next: (v: iUserm) => {
        if (data.user_id == 0) {
          this.id = v.user_id;
          data.user_id = this.id;
          this.mform.patchValue({ user_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(user_upsert_row({ record: v }));

        this.gs.showScreen(["Save Complete"]);

      },
      error: (e) => {
        this.gs.showScreen([e.error]);
      },
      complete: () => { }

    })
  }

  return2Parent() {
    this.location.back();
  }

}