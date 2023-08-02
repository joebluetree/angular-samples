import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iMenum, iMenum_Search } from '../../models/imenum';
import * as allActions from './menu.actions';
import { iPage } from 'src/app/shared/models/ipage';

export interface MenuState extends EntityState<iMenum> {
  selectid: number;
  search_record: iMenum_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  sort_icon: string;
  error: string;
};

const adapter: EntityAdapter<iMenum> = createEntityAdapter<iMenum>({
  selectId: (m) => m.menu_id
});

export const initialState: MenuState = adapter.getInitialState({
  selectid: 0,
  search_record: <iMenum_Search>{ menu_name: '', menu_visible: '' },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  sort_icon: '',
  error: ''
});

export const menuReducer = createReducer<MenuState>(
  initialState,
  on(allActions.menu_load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(allActions.menu_load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(allActions.menu_update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(allActions.menu_update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(allActions.menu_upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(allActions.menu_delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(allActions.menu_sort, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order, sort_icon: action.sort_icon }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
export const MenuFeatureName = 'menuState';
export const menuFeature = createFeatureSelector<MenuState>(MenuFeatureName);
