import { iAccGroupm_Search } from './../../models/iaccgroupm';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accgroup-search',
  templateUrl: './accgroup-search.component.html',
  styleUrls: ['./accgroup-search.component.css']
})
export class AccGroupSearchComponent {

  mform: FormGroup;
  record!: iAccGroupm_Search;


  @Input() set input(v: iAccGroupm_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iAccGroupm_Search>();



  dataList = [
    { key: 'NA', value: 'NA' },
    { key: 'DIRECT INCOME', value: 'DIRECT INCOME' },
    { key: 'DIRECT EXPENSE', value: 'DIRECT EXPENSE' },
    { key: 'INDIRECT INCOME', value: 'INDIRECT INCOME' },
    { key: 'INDIRECT EXPENSE', value: 'INDIRECT EXPENSE' },
    { key: 'ASSET', value: 'ASSET' },
    { key: 'LIABILITIES', value: 'LIABILITIES' },
  ]



  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      grp_name: [''],
      grp_main_group: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      grp_name: this.record.grp_name,
      grp_main_group: this.record.grp_main_group,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.grp_name = this.mform.value.grp_name;
      this.record.grp_main_group = this.mform.value.grp_main_group;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
