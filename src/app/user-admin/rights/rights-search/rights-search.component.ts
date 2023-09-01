import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iUserBranches_Search } from '../../models/iuserbranches';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rights-search',
  templateUrl: './rights-search.component.html',
  styleUrls: ['./rights-search.component.css']
})
export class RightsSearchComponent {

  mform: FormGroup;
  record!: iUserBranches_Search;

  @Input() set input(v: iUserBranches_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iUserBranches_Search>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      user_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      user_name: this.record.user_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.user_name = this.mform.value.user_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
