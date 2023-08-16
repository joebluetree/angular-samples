import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iCompanym_Search } from '../../models/icompanym';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent {

  mform: FormGroup;
  record!: iCompanym_Search;

  @Input() set input(v: iCompanym_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iCompanym_Search>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      comp_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      comp_name: this.record.comp_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.comp_name = this.mform.value.comp_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
