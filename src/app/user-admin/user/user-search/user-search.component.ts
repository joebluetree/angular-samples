import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iUserm_Search } from '../../models/iuserm';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent {

  mform: FormGroup;
  record!: iUserm_Search;

  @Input() set input(v: iUserm_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iUserm_Search>();

  dataList = [{ key: 'NA', value: 'ALL' }, { key: 'Y', value: 'YES' }, { key: 'N', value: 'NO' }]

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      user_name: [''],
      user_is_admin: ['NA'],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      user_name: this.record.user_name,
      user_is_admin: this.record.user_is_admin,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.user_name = this.mform.value.user_name;
      this.record.user_is_admin = this.mform.value.user_is_admin;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
