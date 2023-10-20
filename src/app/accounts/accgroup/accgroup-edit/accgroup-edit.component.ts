import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccGroupService } from '../../services/accgroupm.service';
import { iAccGroupm } from '../../models/iaccgroupm';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { upsert_row } from '../../store/accgroup/accgroup.actions';
import { AccGroupState } from '../../store/accgroup/accgroup.reducer';
import { iMenum } from 'src/app/user-admin/models/imenum';


@Component({
  selector: 'app-accgroup-edit',
  templateUrl: './accgroup-edit.component.html',
  styleUrls: ['./accgroup-edit.component.css']
})
export class AccGroupEditComponent {
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

  dataList = [
    { key: 'DIRECT INCOME', value: 'DIRECT INCOME' },
    { key: 'DIRECT EXPENSE', value: 'DIRECT EXPENSE' },
    { key: 'INDIRECT INCOME', value: 'INDIRECT INCOME' },
    { key: 'INDIRECT EXPENSE', value: 'INDIRECT EXPENSE' },
    { key: 'ASSET', value: 'ASSET' },
    { key: 'LIABILITIES', value: 'LIABILITIES' },
  ]

  constructor(
    private gs: GlobalService,
    private service: AccGroupService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AccGroupState>
  ) {
    this.mform = this.fb.group({
      grp_id: [0],
      grp_name: ['', [Validators.required, Validators.maxLength(100)]],
      grp_type: ['', [Validators.required, Validators.maxLength(20)]],
      grp_order: [0, [Validators.required]],
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
    if (this.id <= 0)
      return;
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        this.mform.setValue({
          grp_id: rec.grp_id,
          grp_name: rec.grp_name,
          grp_type: rec.grp_type,
          grp_order: rec.grp_order,
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
    const data = <iAccGroupm>this.mform.value;

    if (data.grp_id == null)
      data.grp_id = 0;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (v: iAccGroupm) => {
        if (data.grp_id == 0) {
          this.id = v.grp_id;
          data.grp_id = this.id;
          this.mform.patchValue({ grp_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(upsert_row({ record: v }));

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

