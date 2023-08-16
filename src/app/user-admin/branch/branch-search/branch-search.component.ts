import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iBranchm_Search } from '../../models/ibranchm';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-branch-search',
  templateUrl: './branch-search.component.html',
  styleUrls: ['./branch-search.component.css']
})
export class BranchSearchComponent {

  mform: FormGroup;
  record!: iBranchm_Search;

  @Input() set input(v: iBranchm_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iBranchm_Search>();

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      branch_name: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      branch_name: this.record.branch_name,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.branch_name = this.mform.value.branch_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
