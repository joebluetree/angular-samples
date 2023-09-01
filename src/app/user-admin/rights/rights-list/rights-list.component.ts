import * as allSelectors from '../../store/rights/rights.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/rights/rights.actions';
import { Observable } from 'rxjs';
import { iUserBranches, iUserBranches_Search } from '../../models/iuserbranches';
import { iPage } from 'src/app/shared/models/ipage';
import { RightsState } from '../../store/rights/rights.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rights-list',
  templateUrl: './rights-list.component.html',
  styleUrls: ['./rights-list.component.css']
})
export class RightsListComponent {
  menuid = '';
  title = '';
  type = '';

  search_record$: Observable<iUserBranches_Search>;
  records$: Observable<iUserBranches[]>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  page$: Observable<iPage>;


  table_data: any[] = [];

  constructor(
    private store: Store<RightsState>,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.forEach(rec => {
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
    })

    const param = { id: 0, menuid: this.menuid, type: this.type, title: this.title }
    this.table_data = [
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, link: '/admin/rightsEdit', param: param },
      { col_name: "ub_id", col_caption: "ID", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "ub_user_name", col_caption: "USER", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_branch_name", col_caption: "BRANCH", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, link: '', param: {} },
    ];


    this.records$ = this.store.select(allSelectors.selectRights);
    this.search_record$ = this.store.select(allSelectors.selectRightsSearch_Record);
    this.selected_id$ = this.store.select(allSelectors.selectRightsPage_RowId);
    this.sort_column$ = this.store.select(allSelectors.selectRightsPage_SortColumn);
    this.sort_order$ = this.store.select(allSelectors.selectRightsPage_SortOrder);
    this.page$ = this.store.select(allSelectors.selectRightsPage);

  }

  search(search_record: iUserBranches_Search) {
    this.store.dispatch(allActions.rights_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.rights_load_records({ action: _action.action }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.rights_sort({ sort_column: data.sort_column, sort_order: data.sort_order }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.rights_update_selected_rowid({ id: data.row_id }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.ub_user_name} y/n`))
        return;
      this.store.dispatch(allActions.rights_delete({ id: data.rec.ub_id }));
    }
  }

  return2Parent() {
    this.location.back();
  }

}
