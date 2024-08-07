import * as allSelectors from './../../store/param/param.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/param/param.actions';
import { Observable } from 'rxjs';
import { iParam, iParam_Search } from '../../models/iparam';
import { ParamGroupState } from '../../store/param/param.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { iMenum } from 'src/app/user-admin/models/imenum';

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

  bAdmin = false;
  bAdd = false;
  bEdit = false;
  bView = false;
  bDelete = false;

  menum: iMenum | null;

  search_record$: Observable<iParam_Search>;
  records$: Observable<iParam[]>;
  page$: Observable<any>;
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
      this.type = rec["type"];
      this.menum = this.gs.getUserRights(this.menuid);
      if (this.menum) {
        this.title = this.menum.menu_name;
        this.bAdmin = this.menum.rights_admin == "Y" ? true : false;
        this.bAdd = this.menum.rights_add == "Y" ? true : false;
        this.bEdit = this.menum.rights_edit == "Y" ? true : false;
        this.bView = this.menum.rights_view == "Y" ? true : false;
        this.bDelete = this.menum.rights_delete == "Y" ? true : false;
      }
    })


    if (!this.gs.IsValidAppId(this.appid))
      return;

    this.records$ = this.store.select(allSelectors.select_Records);
    this.search_record$ = this.store.select(allSelectors.select_Search_Record);
    this.selected_id$ = this.store.select(allSelectors.select_Page_RowId);
    this.sort_column$ = this.store.select(allSelectors.select_Page_SortColumn);
    this.sort_order$ = this.store.select(allSelectors.select_Page_SortOrder);
    this.page$ = this.store.select(allSelectors.select_Page);

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "VIEW/EDIT", col_format: "edit", col_sortable: false, col_link: '/masters/paramEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "param_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "param_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];

  }

  ngOnInit(): void {
  }

  search(search_record: iParam_Search) {
    this.store.dispatch(allActions.update_search({ search_record: search_record, param_type: this.type }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.load_records({ action: _action.action, param_type: this.type }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.sort_records({ sort_column: data.sort_column, sort_order: data.sort_order, param_type: this.type }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.update_selected_rowid({ id: data.row_id, param_type: this.type }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.param_name} y/n`))
        return;
      this.store.dispatch(allActions.delete_record({ id: data.rec.param_id, param_type: this.type }));
    }
  }

  return2Parent() {
    this.location.back();
  }

  ngOnDestroy(): void {
  }

}



