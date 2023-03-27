import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { module_load_records } from '../../store/module/module.actions';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {

  constructor(private store: Store) {
    this.loadList();
  }


  loadList() {
    this.store.dispatch(module_load_records())
  }

}
