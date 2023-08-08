import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMenum_Search } from '../../models/imenum';
import { GlobalService } from 'src/app/core/services/global.service';
import { iModulem } from '../../models/imodulem';

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

  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

  callBack(action: { id: string, rec: iModulem }) {
    if (action.id == 'module_id') {
      if (action.rec) {
        this.record.module_id = action.rec.module_id;
        this.record.module_name = action.rec.module_name;
      }
      else {
        this.record.module_id = 0;
        this.record.module_name = '';
      }
    }
  }

}
