import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iMenum, iMenum_Search } from '../../models/imenum';
import * as allActions from './menu.actions';
import { iPage } from 'ngx-jrt-controls';

export interface MenuState extends EntityState<iMenum> {
  selectid: number;
  search_record: iMenum_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};

const adapter: EntityAdapter<iMenum> = createEntityAdapter<iMenum>({
  selectId: (m) => m.menu_id
});

export const initialState: MenuState = adapter.getInitialState({
  selectid: 0,
  search_record: <iMenum_Search>{ menu_name: '', module_id: 0, module_name: '', menu_visible: 'NA', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export const Reducer = createReducer<MenuState>(
  initialState,
  on(allActions.load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(allActions.load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(allActions.update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(allActions.update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(allActions.upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(allActions.delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(allActions.sort_records, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
export const FeatureName = 'menuState';
export const Feature = createFeatureSelector<MenuState>(FeatureName);
