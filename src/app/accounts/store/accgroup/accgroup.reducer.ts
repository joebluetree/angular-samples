import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iAccGroupm, iAccGroupm_Search } from '../../models/iaccgroupm';
import * as all_actions from './accgroup.actions';
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

export const Reducer = createReducer<AccGroupState>(
  initialState,
  on(all_actions.load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(all_actions.load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(all_actions.update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(all_actions.update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(all_actions.upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(all_actions.delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(all_actions.sort_data, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const FeatureName = 'accGroupState';
export const Feature = createFeatureSelector<AccGroupState>(FeatureName);
