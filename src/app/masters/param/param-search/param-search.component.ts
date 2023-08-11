import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iParam_Search } from '../../models/iparam';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-param-search',
  templateUrl: './param-search.component.html',
  styleUrls: ['./param-search.component.css']
})
export class ParamSearchComponent {

  mform: FormGroup;
  record!: iParam_Search;

  @Input() set input(v: iParam_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iParam_Search>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }


  buildForm() {
    this.mform = this.fb.group({
      param_name: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      param_name: this.record.param_name,
    })
  }


  search(_action: string) {
    if (this.output) {
      this.record.param_name = this.mform.value.param_name;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
