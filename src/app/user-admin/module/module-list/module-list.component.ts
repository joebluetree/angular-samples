import { modulePage, moduleSearch_Record, moduleState } from './../../store/module/module.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { module_load_records, module_delete, module_update_search, module_update_selected_rowid, module_sort } from '../../store/module/module.actions';
import { Observable, tap, map } from 'rxjs';
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { moduleSelector } from '../../store/module/module.selectors';
import { iPage } from 'src/app/shared/models/ipage';
import { ModuleState } from '../../store/module/module.reducer';

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

  sort_column = "";
  sort_order = "";
  sort_icon = '';

  constructor(
    private store: Store<ModuleState>,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.records$ = this.store.select(moduleSelector);
    this.search_record$ = this.store.select(moduleSearch_Record);
    this.selectedRowId$ = this.store.select(moduleState).pipe(
      tap((e: ModuleState) => {
        this.sort_column = e.sort_column;
        this.sort_order = e.sort_order;
        this.sort_icon = e.sort_icon;
      }),
      map((e: ModuleState) => e.selectid)
    );
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

  deleteRow(_rec: iModulem) {
    if (!confirm(`Delete ${_rec.module_name} y/n`))
      return;
    this.store.dispatch(module_delete({ id: _rec.module_id }));
  }

  sortHeader(col_name: string) {
    if (col_name == this.sort_column)
      this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
    else
      this.sort_order = 'asc';
    this.sort_icon = this.sort_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    this.store.dispatch(module_sort({ sort_column: col_name, sort_order: this.sort_order, sort_icon: this.sort_icon }));
  }

  public getIcon(col: string) {
    if (col == this.sort_column)
      return this.sort_icon;
    else
      return '';
  }

  return2Parent() {
    this.location.back();
  }

}
