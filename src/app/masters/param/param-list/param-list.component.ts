import { selectParamPage, selectParamPage_RowId, selectParamPage_SortColumn, selectParamPage_SortOrder, selectParamRecords, selectParamSearch_Record } from './../../store/param/param.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { param_load_records, param_delete, param_update_search, param_update_selected_rowid, param_sort } from '../../store/param/param.actions';
import { Observable } from 'rxjs';
import { iParam, iParam_Search } from '../../models/iparam';
import { iPage } from '../../../library/models/ipage';
import { ParamGroupState } from '../../store/param/param.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-param-list',
  templateUrl: './param-list.component.html',
  styleUrls: ['./param-list.component.css']
})
export class ParamListComponent {

  appid = '';
  menuid = '';
  title = '';
  type = '';

  search_record$: Observable<iParam_Search>;
  records$: Observable<iParam[]>;
  page$: Observable<iPage>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  table_data: any[] = [];

  constructor(
    private store: Store<ParamGroupState>,
    private route: ActivatedRoute,
    private location: Location,
    private gs: GlobalService
  ) {

    this.route.queryParams.forEach(rec => {
      this.appid = rec["appid"];
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
    })

    if (!this.gs.IsValidAppId(this.appid))
      return;

    this.records$ = this.store.select(selectParamRecords);
    this.search_record$ = this.store.select(selectParamSearch_Record);
    this.selected_id$ = this.store.select(selectParamPage_RowId);
    this.sort_column$ = this.store.select(selectParamPage_SortColumn);
    this.sort_order$ = this.store.select(selectParamPage_SortOrder);
    this.page$ = this.store.select(selectParamPage);

    const param = { id: 0, menuid: this.menuid, type: this.type, title: this.title, appid: this.appid };
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
  }

  ngOnInit(): void {
  }

  search(search_record: iParam_Search) {
    this.store.dispatch(param_update_search({ search_record: search_record, param_type: this.type }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(param_load_records({ action: _action.action, param_type: this.type }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(param_sort({ sort_column: data.sort_column, sort_order: data.sort_order, param_type: this.type }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(param_update_selected_rowid({ id: data.row_id, param_type: this.type }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.param_name} y/n`))
        return;
      this.store.dispatch(param_delete({ id: data.rec.param_id, param_type: this.type }));
    }
  }

  return2Parent() {
    this.location.back();
  }

  ngOnDestroy(): void {
  }

}


