import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMenum_Search } from '../../models/imenum';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.css']
})
export class MenuSearchComponent {

  record!: iMenum_Search;

  @Input() set input(v: iMenum_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iMenum_Search>();

  constructor() {
  }

  search(_action: string) {
    if (this.output) {
      this.output.emit(this.record);
    }
  }

}
