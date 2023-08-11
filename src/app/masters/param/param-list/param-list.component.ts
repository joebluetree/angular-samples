import { selectParamGroupState, selectParamPage, selectParamRecords, selectParamSearch_Record } from './../../store/param/param.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { param_load_records, param_delete, param_update_search, param_update_selected_rowid, param_sort } from '../../store/param/param.actions';
import { Observable, tap, map, Subject, takeUntil } from 'rxjs';
import { iParam, iParam_Search } from '../../models/iparam';
import { iPage } from 'src/app/shared/models/ipage';
import { ParamGroupState, ParamState } from '../../store/param/param.reducer';
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

  _destroy$ = new Subject<void>();

  sort_column = "";
  sort_order = "";
  sort_icon = '';

  selected_id = 0;

  table_data: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<ParamGroupState>,
    private location: Location
  ) {



  }

  ngOnInit(): void {

    this.route.queryParams.forEach(rec => {
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
    })

    const param = { id: '', menuid: this.menuid, type: this.type, title: this.title }

    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, link: '/masters/paramEdit', param: param },
      { col_name: "param_id", col_caption: "ID", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "param_type", col_caption: "TYPE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "param_name", col_caption: "NAME", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "param_order", col_caption: "ORDER", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, link: '', param: {} },
    ];

    this.records$ = this.store.select(selectParamRecords);
    this.search_record$ = this.store.select(selectParamSearch_Record);

    this.selectedRowId$ = this.store.select(selectParamGroupState).pipe(
      tap((e: ParamState) => {
        this.sort_column = e.sort_column;
        this.sort_order = e.sort_order;
        this.sort_icon = e.sort_icon;

        this.selected_id = e.selectid;

      }),
      map((e: ParamState) => e.selectid),
      takeUntil(this._destroy$)
    );
    this.selectedRowId$.subscribe();

    this.page$ = this.store.select(selectParamPage);
  }

  getParam(rec: iParam) {
    return { id: rec.param_id, menuid: this.menuid, type: this.type, title: this.title };
  }

  search(search_record: iParam_Search) {
    this.store.dispatch(param_update_search({ search_record: search_record, param_type: this.type }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(param_load_records({ action: _action.action, param_type: this.type }))
  }




  sortHeader(col_name: string) {
    if (col_name == this.sort_column)
      this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
    else
      this.sort_order = 'asc';
    this.sort_icon = this.sort_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    this.store.dispatch(param_sort({ sort_column: col_name, sort_order: this.sort_order, sort_icon: this.sort_icon, param_type: this.type }));
  }

  public getIcon(col: string) {
    if (col == this.sort_column)
      return this.sort_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    else
      return '';
  }

  selectRow(_id: number) {
    this.store.dispatch(param_update_selected_rowid({ id: _id, param_type: this.type }));
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(param_sort({ sort_column: data.sort_column, sort_order: data.sort_order, sort_icon: data.sort_icon, param_type: this.type }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(param_update_selected_rowid({ id: data.row_id, param_type: this.type }));
    }

    if (data.action == 'DELETE') {
      this.deleteRow(data.rec);
    }
  }


  deleteRow(_rec: iParam) {
    if (!confirm(`Delete ${_rec.param_name} y/n`))
      return;
    this.store.dispatch(param_delete({ id: _rec.param_id, param_type: this.type }));
  }


  return2Parent() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

}


