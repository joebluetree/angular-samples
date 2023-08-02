import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/menu/menu.actions';
import { Observable, tap, map } from 'rxjs';
import { iPage } from 'src/app/shared/models/ipage';
import { iMenum, iMenum_Search } from '../../models/imenum';
import { menuPage, menuSearch_Record, menuSelector, menuState } from '../../store/menu/menu.selectors';
import { MenuState } from '../../store/menu/menu.reducer';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {

  search_record$: Observable<iMenum_Search>;
  records$: Observable<iMenum[]>;
  selectedRowId$: Observable<number>;
  page$: Observable<iPage>;

  sort_column = "";
  sort_order = "";
  sort_icon = '';

  constructor(
    private store: Store<MenuState>,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.records$ = this.store.select(menuSelector);
    this.search_record$ = this.store.select(menuSearch_Record);
    this.selectedRowId$ = this.store.select(menuState).pipe(
      tap((e: MenuState) => {
        this.sort_column = e.sort_column;
        this.sort_order = e.sort_order;
        this.sort_icon = e.sort_icon;
      }),
      map((e: MenuState) => e.selectid)
    );
    this.page$ = this.store.select(menuPage);
  }

  search(search_record: iMenum_Search) {
    this.store.dispatch(allActions.menu_update_search({ search_record: search_record }))
    this.pageEvents({ 'action': 'search' });
  }

  pageEvents(_action: any) {
    this.store.dispatch(allActions.menu_load_records({ action: _action.action }))
  }

  selectRow(_id: number) {
    this.store.dispatch(allActions.menu_update_selected_rowid({ id: _id }));
  }

  deleteRow(_rec: iMenum) {
    if (!confirm(`Delete ${_rec.menu_name} y/n`))
      return;
    this.store.dispatch(allActions.menu_delete({ id: _rec.menu_id }));
  }

  sortHeader(col_name: string) {
    if (col_name == this.sort_column)
      this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
    else
      this.sort_order = 'asc';
    this.sort_icon = this.sort_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    this.store.dispatch(allActions.menu_sort({ sort_column: col_name, sort_order: this.sort_order, sort_icon: this.sort_icon }));
  }

  public getIcon(col: string) {
    if (col == this.sort_column)
      return this.sort_icon;
    else
      return '';
  }

  return2Parent() {
    this.location.back();
  }

}
