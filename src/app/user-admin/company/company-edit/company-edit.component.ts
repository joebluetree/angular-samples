import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { iCompanym } from '../../models/icompanym';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { company_upsert_row } from '../../store/company/company.actions';
import { CompanyState } from '../../store/company/company.reducer';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent {
  id = 0;
  appid = '';
  menuid = '';
  title = '';
  type = '';

  showModel = true;
  mform: FormGroup;

  constructor(
    private gs: GlobalService,
    private service: CompanyService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<CompanyState>
  ) {
    this.mform = this.fb.group({
      comp_id: [0],
      comp_code: ['', [Validators.required, Validators.maxLength(20)]],
      comp_name: ['', [Validators.required, Validators.maxLength(100)]],
      comp_address1: ['', [Validators.required, Validators.maxLength(100)]],
      comp_address2: ['', [Validators.required, Validators.maxLength(100)]],
      comp_address3: ['', [Validators.required, Validators.maxLength(100)]],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.route.queryParams.forEach(rec => {
      this.appid = rec["appid"];
      this.id = +rec["id"];
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
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
          comp_id: rec.comp_id,
          comp_code: rec.comp_code,
          comp_name: rec.comp_name,
          comp_address1: rec.comp_address1,
          comp_address2: rec.comp_address2,
          comp_address3: rec.comp_address3,

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
    const data = <iCompanym>this.mform.value;

    if (data.comp_id == null)
      data.comp_id = 0;


    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;


    this.service.save(this.id, data).subscribe({
      next: (v: iCompanym) => {
        if (data.comp_id == 0) {
          this.id = v.comp_id;
          data.comp_id = this.id;
          this.mform.patchValue({ comp_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(company_upsert_row({ record: v }));

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

