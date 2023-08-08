import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMenum_Search } from '../../models/imenum';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.css']
})
export class MenuSearchComponent {

  module_id = "";

  record!: iMenum_Search;

  @Input() set input(v: iMenum_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iMenum_Search>();

  constructor(private gs: GlobalService) {
  }

  search(_action: string) {
    if (this.output) {
      console.log(this.record);
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

  callBack(action: { id: string, rec: any }) {
    if (action.id == 'module_id') {
      this.record.module_id = action.rec.module_id;
      this.record.module_name = action.rec.module_name;
    }
  }

}
