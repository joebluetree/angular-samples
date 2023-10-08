import * as allSelectors from '../../store/company/company.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/company/company.actions';
import { Observable } from 'rxjs';
import { iCompanym, iCompanym_Search } from '../../models/icompanym';
import { iPage } from 'ngx-jrt-controls';
import { CompanyState } from '../../store/company/company.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { iMenum } from '../../models/imenum';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
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

  search_record$: Observable<iCompanym_Search>;
  records$: Observable<iCompanym[]>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  page$: Observable<iPage>;


  table_data: any[] = [];

  constructor(
    private store: Store<CompanyState>,
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

    const param = { id: 0, menuid: this.menuid, type: this.type, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, col_link: '/admin/companyEdit', col_param: param, col_show: this.bEdit || this.bView },
      { col_name: "comp_id", col_caption: "ID", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "comp_code", col_caption: "CODE", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "comp_name", col_caption: "NAME", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "comp_address1", col_caption: "ADDRESS1", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "comp_address2", col_caption: "ADDRESS2", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "comp_address3", col_caption: "ADDRESS3", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },


      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, col_link: '', col_param: {}, col_show: true },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, col_link: '', col_param: {}, col_show: true },
    ];


    this.records$ = this.store.select(allSelectors.selectCompany);
    this.search_record$ = this.store.select(allSelectors.selectCompanySearch_Record);
    this.selected_id$ = this.store.select(allSelectors.selectCompanyPage_RowId);
    this.sort_column$ = this.store.select(allSelectors.selectCompanyPage_SortColumn);
    this.sort_order$ = this.store.select(allSelectors.selectCompanyPage_SortOrder);
    this.page$ = this.store.select(allSelectors.selectCompanyPage);

  }

  search(search_record: iCompanym_Search) {
    this.store.dispatch(allActions.company_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.company_load_records({ action: _action.action }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.company_sort({ sort_column: data.sort_column, sort_order: data.sort_order }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.company_update_selected_rowid({ id: data.row_id }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.comp_name} y/n`))
        return;
      this.store.dispatch(allActions.company_delete({ id: data.rec.comp_id }));
    }
  }

  return2Parent() {
    this.location.back();
  }

}
