import { iAcctm_Search } from '../../models/iacctm';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-acctm-search',
  templateUrl: './acctm-search.component.html',
  styleUrls: ['./acctm-search.component.css']
})
export class AcctmSearchComponent {

  mform: FormGroup;
  record!: iAcctm_Search;


  @Input() set input(v: iAcctm_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iAcctm_Search>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      acc_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      acc_name: this.record.acc_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.acc_name = this.mform.value.acc_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
