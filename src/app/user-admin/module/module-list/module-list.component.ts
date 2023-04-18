import { modulePage, moduleSearch_Record, moduleSelectedRowId } from './../../store/module/module.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { module_load_records, module_delete, module_update_search, module_update_selected_rowid } from '../../store/module/module.actions';
import { Observable, tap } from 'rxjs';
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { moduleSelector } from '../../store/module/module.selectors';
import { iPage } from 'src/app/shared/models/ipage';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {

  search_record$: Observable<iModulem_Search>;
  records$: Observable<iModulem[]>;
  selectedRowId$: Observable<number>;
  page$: Observable<iPage>;

  constructor(private store: Store,
    private location: Location) {

    this.records$ = this.store.select(moduleSelector);

    this.search_record$ = this.store.select(moduleSearch_Record).pipe(
      tap(v => console.log(v))
    );

    this.selectedRowId$ = this.store.select(moduleSelectedRowId);

    this.page$ = this.store.select(modulePage);

  }

  search(search_record: iModulem_Search) {
    this.store.dispatch(module_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(module_load_records({ action: _action.action }))
  }

  selectRow(_id: number) {
    this.store.dispatch(module_update_selected_rowid({ id: _id }));
  }

  deleteRow(_id: number) {
    if (!confirm('Delete y/n'))
      return;
    this.store.dispatch(module_delete({ id: _id }));
  }

  return2Parent() {
    this.location.back();
  }

}
