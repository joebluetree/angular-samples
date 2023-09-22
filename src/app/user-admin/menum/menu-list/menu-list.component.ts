import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/menu/menu.actions';
import { Observable } from 'rxjs';
import { iPage } from 'src/app/shared/models/ipage';
import { iMenum, iMenum_Search } from '../../models/imenum';
import { selectMenu, selectMenuPage, selectMenuPage_RowId, selectMenuPage_SortColumn, selectMenuPage_SortOrder, selectMenuSearch_Record } from '../../store/menu/menu.selectors';
import { MenuState } from '../../store/menu/menu.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {

  search_record$: Observable<iMenum_Search>;
  records$: Observable<iMenum[]>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  page$: Observable<iPage>;

  table_data: any[] = [];

  appid = '';
  menuid = '';
  title = '';
  type = '';

  constructor(
    private store: Store<MenuState>,
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
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, link: '/admin/menuEdit', param: param },
      { col_name: "menu_id", col_caption: "ID", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_code", col_caption: "CODE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_name", col_caption: "NAME", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_route", col_caption: "ROUTE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_param", col_caption: "PARAM", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_visible", col_caption: "VISIBLE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_module_name", col_caption: "MODULE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "menu_order", col_caption: "ORDER", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, link: '', param: {} },
    ];

    this.records$ = this.store.select(selectMenu);
    this.search_record$ = this.store.select(selectMenuSearch_Record);
    this.selected_id$ = this.store.select(selectMenuPage_RowId);
    this.sort_column$ = this.store.select(selectMenuPage_SortColumn);
    this.sort_order$ = this.store.select(selectMenuPage_SortOrder);
    this.page$ = this.store.select(selectMenuPage);
  }

  search(search_record: iMenum_Search) {
    this.store.dispatch(allActions.menu_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.menu_load_records({ action: _action.action }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.menu_sort({ sort_column: data.sort_column, sort_order: data.sort_order }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.menu_update_selected_rowid({ id: data.row_id }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.menu_name} y/n`))
        return;
      this.store.dispatch(allActions.menu_delete({ id: data.rec.menu_id }));
    }
  }


  return2Parent() {
    this.location.back();
  }

}
