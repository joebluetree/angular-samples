import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iParam_Search } from '../../models/iparam';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-param-search',
  templateUrl: './param-search.component.html',
  styleUrls: ['./param-search.component.css']
})
export class ParamSearchComponent {

  record!: iParam_Search;

  @Input() set input(v: iParam_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iParam_Search>();

  constructor(private gs: GlobalService) {
  }

  search(_action: string) {
    if (this.output) {
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
