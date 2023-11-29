import * as allSelectors from './../../store/settings/settings.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/settings/settings.actions';
import { Observable } from 'rxjs';
import { iSettings, iSettings_Search } from '../../models/isettings';
import { SettingsGroupState } from '../../store/settings/settings.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { iMenum } from 'src/app/user-admin/models/imenum';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent {

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


  search_record$: Observable<iSettings_Search>;
  records$: Observable<iSettings[]>;
  page$: Observable<any>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  format$: Observable<string>;
  table_data: any[] = [];

  constructor(
    private store: Store<SettingsGroupState>,
    private route: ActivatedRoute,
    private location: Location,
    private gs: GlobalService,
    private service: SettingsService
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
    this.format$ = this.store.select(allSelectors.select_Format);

    //this.store.dispatch(allActions.update_format({ category: this.type }));

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "caption", col_caption: "CAPTION", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "type", col_caption: "TYPE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "table", col_caption: "TABLE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "value", col_caption: "VALUE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "order", col_caption: "ORDER", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
    ];
  }

  ngOnInit(): void {
  }

  search(search_record: iSettings_Search) {
    this.store.dispatch(allActions.update_search({ search_record: search_record, category: this.type }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.load_records({ action: _action.action, category: this.type }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.sort_records({ sort_column: data.sort_column, sort_order: data.sort_order, category: this.type }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.update_selected_rowid({ id: data.row_id, category: this.type }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.param_name} y/n`))
        return;
      this.store.dispatch(allActions.delete_record({ id: data.rec.param_id, category: this.type }));
    }
  }

  return2Parent() {
    this.location.back();
  }

  ngOnDestroy(): void {
  }



  save() {
    this.service.ReUpdate(this.type, this.gs.user.user_company_id, this.gs.user.user_branch_id, this.gs.user.user_code).subscribe({
      next: (v) => {
        this.gs.showScreen(["Save Complete"]);
      },
      error: (e) => {
        this.gs.showScreen([e.error || e.message]);
      },
      complete: () => { }
    });

  }

  changeFormat() {
    this.store.dispatch(allActions.update_format({ category: this.type }));
  }

  selectRow(rec: any) {
    this.store.dispatch(allActions.update_selected_rowid({ id: rec.id, category: this.type }));
  }

}



