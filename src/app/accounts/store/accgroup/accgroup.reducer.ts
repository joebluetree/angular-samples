import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iAccGroupm, iAccGroupm_Search } from '../../models/iaccgroupm';
import * as user_actions from './accgroup.actions';
import { iPage } from 'ngx-jrt-controls';

export interface AccGroupState extends EntityState<iAccGroupm> {
  selectid: number;
  search_record: iAccGroupm_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};


const adapter: EntityAdapter<iAccGroupm> = createEntityAdapter<iAccGroupm>({
  selectId: (m) => m.grp_id
});

export const initialState: AccGroupState = adapter.getInitialState({
  selectid: 0,
  search_record: <iAccGroupm_Search>{ grp_name: '', grp_Type: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export const accGroupReducer = createReducer<AccGroupState>(
  initialState,
  on(user_actions.accgroup_load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(user_actions.accgroup_load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(user_actions.accgroup_update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(user_actions.accgroup_update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(user_actions.accgroup_upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(user_actions.accgroup_delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(user_actions.accgroup_sort, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const AccgroupFeatureName = 'accGroupState';
export const accgroupFeature = createFeatureSelector<AccGroupState>(AccgroupFeatureName);
