import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMenum_Search } from '../../models/imenum';

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

  constructor() {
  }

  search(_action: string) {
    if (this.output) {
      console.log(this.record);
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
