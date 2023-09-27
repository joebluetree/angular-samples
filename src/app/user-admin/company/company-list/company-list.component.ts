import * as allSelectors from '../../store/company/company.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/company/company.actions';
import { Observable } from 'rxjs';
import { iCompanym, iCompanym_Search } from '../../models/icompanym';
import { iPage } from '../../../library/models/ipage';
import { CompanyState } from '../../store/company/company.reducer';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';

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
      this.title = rec["title"];
      this.type = rec["type"];
    })

    if (!this.gs.IsValidAppId(this.appid))
      return;

    const param = { id: 0, menuid: this.menuid, type: this.type, title: this.title, appid: this.appid };
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, link: '/admin/companyEdit', param: param },
      { col_name: "comp_id", col_caption: "ID", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "comp_code", col_caption: "CODE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "comp_name", col_caption: "NAME", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "comp_address1", col_caption: "ADDRESS1", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "comp_address2", col_caption: "ADDRESS2", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "comp_address3", col_caption: "ADDRESS3", col_format: "", col_sortable: true, link: '', param: {} },


      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, link: '', param: {} },
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
