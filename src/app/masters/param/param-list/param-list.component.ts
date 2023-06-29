import { paramPage, paramSearch_Record, paramState } from './../../store/param/param.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { param_load_records, param_delete, param_update_search, param_update_selected_rowid, param_sort } from '../../store/param/param.actions';
import { Observable, tap, map } from 'rxjs';
import { iParam, iParam_Search } from '../../models/iparam';
import { paramSelector } from '../../store/param/param.selectors';
import { iPage } from 'src/app/shared/models/ipage';
import { ParamState } from '../../store/param/param.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-param-list',
  templateUrl: './param-list.component.html',
  styleUrls: ['./param-list.component.css']
})
export class ParamListComponent {

  menuid = '';
  title = '';
  type = '';

  search_record$: Observable<iParam_Search>;
  records$: Observable<iParam[]>;
  selectedRowId$: Observable<number>;
  page$: Observable<iPage>;

  sort_column = "";
  sort_order = "";

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location
  ) {

    this.route.queryParams.forEach(rec => {
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
    })

    this.records$ = this.store.select(paramSelector);

    this.search_record$ = this.store.select(paramSearch_Record).pipe(
      tap(v => console.log(v))
    );

    this.selectedRowId$ = this.store.select(paramState).pipe(
      tap((e: ParamState) => {
        this.sort_column = e.sort_column;
        this.sort_order = e.sort_order;
      }),
      map((e: ParamState) => e.selectid)
    );

    this.page$ = this.store.select(paramPage);

  }

  search(search_record: iParam_Search) {
    this.store.dispatch(param_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(param_load_records({ action: _action.action }))
  }

  selectRow(_id: number) {
    this.store.dispatch(param_update_selected_rowid({ id: _id }));
  }

  deleteRow(_rec: iParam) {
    if (!confirm(`Delete ${_rec.param_name} y/n`))
      return;
    this.store.dispatch(param_delete({ id: _rec.param_id }));
  }

  sortHeader(col_name: string) {
    this.store.dispatch(param_sort({ colName: col_name }));
  }

  public getIcon(col: string, sorted_col: string, sorted_order: string) {
    if (col == sorted_col)
      return sorted_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    else
      return '';
  }

  return2Parent() {
    this.location.back();
  }

}