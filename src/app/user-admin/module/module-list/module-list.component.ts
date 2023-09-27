import { selectModule, selectModulePage, selectModulePage_RowId, selectModulePage_SortColumn, selectModulePage_SortOrder, selectModuleSearch_Record } from './../../store/module/module.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { module_load_records, module_delete, module_update_search, module_update_selected_rowid, module_sort } from '../../store/module/module.actions';
import { Observable } from 'rxjs';
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { iPage } from 'ngx-jrt-controls';
import { ModuleState } from '../../store/module/module.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';

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
      this.title = rec["title"];
      this.type = rec["type"];
    })

    if (!this.gs.IsValidAppId(this.appid))
      return;

    const param = { id: 0, menuid: this.menuid, type: this.type, title: this.title, appid: this.appid }
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, link: '/admin/moduleEdit', param: param },
      { col_name: "module_id", col_caption: "ID", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "module_name", col_caption: "NAME", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "module_is_installed", col_caption: "VISIBLE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "module_order", col_caption: "ORDER", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, link: '', param: {} },
    ];


    this.records$ = this.store.select(selectModule);
    this.search_record$ = this.store.select(selectModuleSearch_Record);
    this.selected_id$ = this.store.select(selectModulePage_RowId);
    this.sort_column$ = this.store.select(selectModulePage_SortColumn);
    this.sort_order$ = this.store.select(selectModulePage_SortOrder);
    this.page$ = this.store.select(selectModulePage);

  }

  search(search_record: iModulem_Search) {
    this.store.dispatch(module_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(module_load_records({ action: _action.action }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(module_sort({ sort_column: data.sort_column, sort_order: data.sort_order }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(module_update_selected_rowid({ id: data.row_id }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.module_name} y/n`))
        return;
      this.store.dispatch(module_delete({ id: data.rec.module_id }));
    }
  }

  return2Parent() {
    this.location.back();
  }

}
