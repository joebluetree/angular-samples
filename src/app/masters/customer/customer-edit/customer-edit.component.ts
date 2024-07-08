import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomermService } from '../../services/customerm.service';
import { iCustomerm } from '../../models/icustomerm';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { upsert_row } from '../../store/customer/customer.actions';
import { CustomermState } from '../../store/customer/customer.reducer';
import { iMenum } from 'src/app/user-admin/models/imenum';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent {
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

  filter = { cust_row_type: this.type };



  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'AR', value: 'AR' },
    { key: 'AP', value: 'AP' },
  ]


  constructor(
    private gs: GlobalService,
    private service: CustomermService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<CustomermState>
  ) {
    this.mform = this.fb.group({
      cust_id: [0],
      cust_code: ['', [Validators.required, Validators.maxLength(15)]],
      cust_short_name: ['', [Validators.maxLength(15)]],
      cust_name: ['', [Validators.required, Validators.maxLength(100)]],

      cust_display_name: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address1: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address2: ['', [Validators.required, Validators.maxLength(100)]],
      cust_address3: [''],


      cust_type: [''],
      cust_row_type: [this.type],
      cust_parent_id: [null],
      cust_parent_name: [''],
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
          cust_id: rec.cust_id,
          cust_code: rec.cust_code,
          cust_short_name: rec.cust_short_name,
          cust_name: rec.cust_name,
          cust_display_name: rec.cust_display_name,
          cust_address1: rec.cust_address1,
          cust_address2: rec.cust_address2,
          cust_address3: rec.cust_address3,
          cust_type: rec.cust_type,
          cust_row_type: rec.cust_row_type,
          cust_parent_id: rec.cust_parent_id,
          cust_parent_name: rec.cust_parent_name,
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
    const data = <iCustomerm>this.mform.value;

    if (data.cust_id == null)
      data.cust_id = 0;

    data.cust_row_type = this.type;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (v: iCustomerm) => {
        if (data.cust_id == 0) {
          this.id = v.cust_id;
          data.cust_id = this.id;
          this.mform.patchValue({ cust_id: this.id });
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


  callBack_Customer(action: { id: string, rec: iCustomerm }) {
    if (action.rec == null) {
      this.mform.patchValue({
        cust_parent_id: null,
        cust_parent_name: '',
      });
    }
    else {
      this.mform.patchValue({
        cust_parent_id: action.rec.cust_id,
        cust_parent_name: action.rec.cust_name,
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

