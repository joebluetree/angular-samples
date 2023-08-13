import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iUserm, iUserm_Search } from '../../models/iuserm';
import * as user_actions from './user.actions';
import { iPage } from 'src/app/shared/models/ipage';

export interface UserState extends EntityState<iUserm> {
  selectid: number;
  search_record: iUserm_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};


const adapter: EntityAdapter<iUserm> = createEntityAdapter<iUserm>({
  selectId: (m) => m.user_id
});

export const initialState: UserState = adapter.getInitialState({
  selectid: 0,
  search_record: <iUserm_Search>{ user_name: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export const userReducer = createReducer<UserState>(
  initialState,
  on(user_actions.user_load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(user_actions.user_load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(user_actions.user_update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(user_actions.user_update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(user_actions.user_upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(user_actions.user_delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(user_actions.user_sort, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const UserFeatureName = 'userState';
export const userFeature = createFeatureSelector<UserState>(UserFeatureName);
