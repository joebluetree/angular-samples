import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcctmService } from '../../services/acctm.service';
import { iAcctm } from '../../models/iacctm';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { upsert_row } from '../../store/acctm/acctm.actions';
import { AcctmState } from '../../store/acctm/acctm.reducer';
import { iMenum } from 'src/app/user-admin/models/imenum';
import { iAccGroupm } from '../../models/iaccgroupm';


@Component({
  selector: 'app-acctm-edit',
  templateUrl: './acctm-edit.component.html',
  styleUrls: ['./acctm-edit.component.css']
})
export class AcctmEditComponent {
  id = 0;
  appid = '';
  menuid = '';
  title = '';
  type = '';

  bAdmin = false;
  bAdd = false;
  bEdit = false;
  bView = false;
  bDelete = false;

  menum: iMenum | null;

  showModel = true;
  mform: FormGroup;

  filter = { acc_row_type: this.type };



  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'AR', value: 'AR' },
    { key: 'AP', value: 'AP' },
  ]


  constructor(
    private gs: GlobalService,
    private service: AcctmService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AcctmState>
  ) {
    this.mform = this.fb.group({
      acc_id: [0],
      acc_code: ['', [Validators.required, Validators.maxLength(15)]],
      acc_short_name: ['', [Validators.maxLength(15)]],
      acc_name: ['', [Validators.required, Validators.maxLength(100)]],
      acc_type: ['NA', [Validators.required, Validators.maxLength(100)]],
      acc_row_type: [this.type],
      acc_maincode_id: [null],
      acc_maincode_name: [''],
      acc_grp_id: [null, [Validators.required]],
      acc_grp_name: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.route.queryParams.forEach(rec => {
      this.appid = rec["appid"];
      this.id = +rec["id"];
      this.menuid = rec["menuid"];
      this.type = rec["type"];
      this.menum = this.gs.getUserRights(this.menuid);
      if (this.menum) {
        this.title = this.menum.menu_name;
        this.bAdmin = this.menum.rights_admin == "Y" ? true : false;
        this.bAdd = this.menum.rights_add == "Y" ? true : false;
        this.bEdit = this.menum.rights_edit == "Y" ? true : false;
        this.bView = this.menum.rights_view == "Y" ? true : false;
        this.bDelete = this.menum.rights_delete == "Y" ? true : false;
      }
    })

    if (!this.gs.IsValidAppId(this.appid))
      return;

    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0) {
      return;
    }
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        console.log(rec);
        this.mform.setValue({
          acc_id: rec.acc_id,
          acc_code: rec.acc_code,
          acc_short_name: rec.acc_short_name,
          acc_name: rec.acc_name,
          acc_type: rec.acc_type,
          acc_grp_id: rec.acc_grp_id,
          acc_grp_name: rec.acc_grp_name,
          acc_row_type: rec.acc_row_type,
          acc_maincode_id: rec.acc_maincode_id,
          acc_maincode_name: rec.acc_maincode_name,
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
    const data = <iAcctm>this.mform.value;

    if (data.acc_id == null)
      data.acc_id = 0;

    data.acc_row_type = this.type;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (v: iAcctm) => {
        if (data.acc_id == 0) {
          this.id = v.acc_id;
          data.acc_id = this.id;
          this.mform.patchValue({ acc_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(upsert_row({ record: v, row_type: this.type }));

        this.gs.showScreen(["Save Complete"]);

      },
      error: (e) => {
        this.gs.showScreen([e.error]);
      },
      complete: () => { }

    })
  }

  callBack_AccGroup(action: { id: string, rec: iAccGroupm }) {
    if (action.rec == null) {
      this.mform.patchValue({
        acc_grp_id: null,
        acc_grp_name: '',
      });
    }
    else {
      this.mform.patchValue({
        acc_grp_id: action.rec.grp_id,
        acc_grp_name: action.rec.grp_name,
      });
    }
  }
  callBack_Acctm(action: { id: string, rec: iAcctm }) {
    if (action.rec == null) {
      this.mform.patchValue({
        acc_maincode_id: null,
        acc_maincode_name: '',
      });
    }
    else {
      this.mform.patchValue({
        acc_maincode_id: action.rec.acc_id,
        acc_maincode_name: action.rec.acc_name,
      });
    }
  }

  public get url() {
    return this.gs.url;
  }
  getCompanyId() {
    return this.gs.user.user_company_id;
  }



  return2Parent() {
    this.location.back();
  }

}

