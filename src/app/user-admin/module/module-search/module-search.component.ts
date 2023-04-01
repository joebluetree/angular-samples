import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iModulem_Search } from '../../models/imodulem';

@Component({
  selector: 'app-module-search',
  templateUrl: './module-search.component.html',
  styleUrls: ['./module-search.component.css']
})
export class ModuleSearchComponent {

  record!: iModulem_Search;

  @Input() set input(v: iModulem_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iModulem_Search>();

  constructor() {
  }

  search(_action: string) {
    if (this.output) {
      this.output.emit(this.record);
    }
  }

}
