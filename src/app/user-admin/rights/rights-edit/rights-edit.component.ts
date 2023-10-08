import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RightsService } from '../../services/rights.service';
import { iRights_header, iRights } from '../../models/irights';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { RightsState } from '../../store/rights/rights.reducer';
import { iBranchm } from '../../models/ibranchm';
import { iMenum } from '../../models/imenum';


@Component({
  selector: 'app-rights-edit',
  templateUrl: './rights-edit.component.html',
  styleUrls: ['./rights-edit.component.css']
})
export class RightsEditComponent {
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

  constructor(
    private cd: ChangeDetectorRef,
    private gs: GlobalService,
    private service: RightsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<RightsState>
  ) {

    this.mform = this.fb.group({
      id: [0],
      comp_id: [0],
      branch_id: [0],
      user_id: [0],
      records: this.fb.array([]),
    })
  }

  addRow(rec: iRights) {
    return this.fb.group({
      rights_id: [rec ? rec.rights_id : 0],
      rights_parent_id: [rec ? rec.rights_parent_id : 0],
      rights_menu_id: [rec ? rec.rights_menu_id : 0],
      rights_menu_name: [rec ? rec.rights_menu_name : ''],
      rights_module_name: [rec ? rec.rights_module_name : ''],
      rights_selected: [rec ? rec.rights_selected : 'N'],
      rights_company: [rec ? rec.rights_company : 'N'],
      rights_admin: [rec ? rec.rights_admin : 'N'],
      rights_add: [rec ? rec.rights_add : 'N'],
      rights_edit: [rec ? rec.rights_edit : 'N'],
      rights_delete: [rec ? rec.rights_delete : 'N'],
      rights_view: [rec ? rec.rights_view : 'N'],
      rights_print: [rec ? rec.rights_print : 'N'],
      rights_doc_upload: [rec ? rec.rights_doc_upload : 'N'],
      rights_doc_view: [rec ? rec.rights_doc_view : 'N'],
      rights_approver: [rec ? rec.rights_approver : 'N'],
      rights_value: [rec ? rec.rights_value : 'N'],
      rec_company_id: [rec ? rec.rec_company_id : 0],
      rec_branch_id: [rec ? rec.rec_branch_id : 0],
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


  get formArray(): FormArray {
    return this.mform.get("records") as FormArray;
  }


  getRecord() {
    if (this.id <= 0)
      return;

    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        this.loaddata(rec);
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }

  loaddata(rec: iRights_header) {

    this.mform.patchValue({
      id: rec.id,
      comp_id: rec.comp_id,
      branch_id: rec.branch_id,
      user_id: rec.user_id,
    });
    this.formArray.clear();
    rec.records.forEach(rec => {
      this.formArray.push(this.addRow(rec));
    });
  }


  getControl(ctrlName: string) {
    return this.mform.controls[ctrlName];
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }

    const data = <iRights_header>this.mform.value;

    //data.rec_company_id = this.gs.user.user_company_id;
    //data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (rec: iRights_header) => {
        this.loaddata(rec);
        const param = {
          id: this.id.toString()
        };
        //this.gs.updateURL(param);
        //this.store.dispatch(rights_upsert_row({ record: rec }));
        this.gs.showScreen(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showScreen([e.error]);
      },
      complete: () => { }
    });

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
