import * as allSelectors from '../../store/user/user.selectors';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/user/user.actions';
import { Observable } from 'rxjs';
import { iUserm, iUserm_Search } from '../../models/iuserm';
import { iPage } from 'src/app/shared/models/ipage';
import { UserState } from '../../store/user/user.reducer';
import { ActivatedRoute } from '@angular/router';
import { selectUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  menuid = '';
  title = '';
  type = '';

  search_record$: Observable<iUserm_Search>;
  records$: Observable<iUserm[]>;
  selected_id$: Observable<number>;
  sort_column$: Observable<string>;
  sort_order$: Observable<string>;
  page$: Observable<iPage>;


  table_data: any[] = [];

  constructor(
    private store: Store<UserState>,
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
      { col_name: "edit", col_caption: "EDIT", col_format: "edit", col_sortable: false, link: '/admin/userEdit', param: param },
      { col_name: "user_id", col_caption: "ID", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "user_code", col_caption: "CODE", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "user_name", col_caption: "NAME", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "user_is_admin", col_caption: "ADMIN", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_branch_name", col_caption: "DEFAULT-BRANCH", col_format: "", col_sortable: true, link: '', param: {} },

      { col_name: "rec_created_by", col_caption: "CREATED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_created_date", col_caption: "CREATED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_by", col_caption: "EDITED-BY", col_format: "", col_sortable: true, link: '', param: {} },
      { col_name: "rec_edited_date", col_caption: "EDITED-DT", col_format: "datetime", col_sortable: true, link: '', param: {} },
      { col_name: "delete", col_caption: "DELETE", col_format: "delete", col_sortable: false, link: '', param: {} },
    ];


    this.records$ = this.store.select(allSelectors.selectUser);
    this.search_record$ = this.store.select(allSelectors.selectUserSearch_Record);
    this.selected_id$ = this.store.select(allSelectors.selectUserPage_RowId);
    this.sort_column$ = this.store.select(allSelectors.selectUserPage_SortColumn);
    this.sort_order$ = this.store.select(allSelectors.selectUserPage_SortOrder);
    this.page$ = this.store.select(allSelectors.selectUserPage);

  }

  search(search_record: iUserm_Search) {
    this.store.dispatch(allActions.user_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.user_load_records({ action: _action.action }))
  }

  callback_table(data: any) {
    if (data.action == 'SORT') {
      this.store.dispatch(allActions.user_sort({ sort_column: data.sort_column, sort_order: data.sort_order }));
    }
    if (data.action == 'ROW-SELECTED') {
      this.store.dispatch(allActions.user_update_selected_rowid({ id: data.row_id }));
    }
    if (data.action == 'DELETE') {
      if (!confirm(`Delete ${data.rec.user_name} y/n`))
        return;
      this.store.dispatch(allActions.user_delete({ id: data.rec.user_id }));
    }
  }

  return2Parent() {
    this.location.back();
  }

}
