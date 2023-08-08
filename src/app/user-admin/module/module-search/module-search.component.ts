import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iModulem_Search } from '../../models/imodulem';
import { GlobalService } from 'src/app/core/services/global.service';

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

  constructor(private gs: GlobalService) {
  }

  search(_action: string) {
    if (this.output) {
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
