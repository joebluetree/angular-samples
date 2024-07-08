import { iCustomerm_Search } from '../../models/icustomerm';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent {

  mform: FormGroup;
  record!: iCustomerm_Search;


  @Input() set input(v: iCustomerm_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iCustomerm_Search>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      cust_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      cust_name: this.record.cust_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.cust_name = this.mform.value.cust_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
