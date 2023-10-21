import * as allSelectors from './../../store/module/module.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/module/module.actions';
import { Observable } from 'rxjs';
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { iPage } from 'ngx-jrt-controls';
import { ModuleState } from '../../store/module/module.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { iMenum } from '../../models/imenum';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {
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




  search_record$: Observable<iModulem_Search>;
  records$: Observable<iModulem[]>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  page$: Observable<iPage>;


  table_data: any[] = [];

  constructor(
    private store: Store<ModuleState>,
    private route: ActivatedRoute,
    private location: Location,
    private gs: GlobalService
  ) { }

  ngOnInit(): void {

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

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid }
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/admin/moduleEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "module_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "module_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "module_is_installed", col_caption: "VISIBLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "module_order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: this.bDelete },
    ];


    this.records$ = this.store.select(allSelectors.select_Records);
    this.search_record$ = this.store.select(allSelectors.select_Search_Record);
    this.selected_id$ = this.store.select(allSelectors.select_Page_RowId);
    this.sort_column$ = this.store.select(allSelectors.select_Page_SortColumn);
    this.sort_order$ = this.store.select(allSelectors.select_Page_SortOrder);
    this.page$ = this.store.select(allSelectors.select_Page);

  }

  search(search_record: iModulem_Search) {
    this.store.dispatch(allActions.update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.load_records({ action: _action.action }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.sort_records({ sort_column: data.sort_column, sort_order: data.sort_order }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.update_selected_rowid({ id: data.row_id }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.module_name} y/n`))
        return;
      this.store.dispatch(allActions.delete_record({ id: data.rec.module_id }));
    }
  }

  return2Parent() {
    this.location.back();
  }

}
