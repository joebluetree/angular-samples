import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { module_load_records } from '../../store/module/module.actions';
import { Observable, tap } from 'rxjs';
import { iModulem } from '../../models/imodulem';
import { moduleSelector } from '../../store/module/module.selectors';


@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {

  records$: Observable<iModulem[]>;

  constructor(private store: Store,
    private location: Location) {
    this.records$ = this.store.select(moduleSelector);
  }


  serach() {
    this.store.dispatch(module_load_records())
  }

  return2Parent() {
    this.location.back();
  }

}
