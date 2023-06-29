import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iParam_Search } from '../../models/iparam';

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

  constructor() {
  }

  search(_action: string) {
    if (this.output) {
      this.output.emit(this.record);
    }
  }

}
