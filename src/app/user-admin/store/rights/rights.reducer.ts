import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iUserBranches, iUserBranches_Search } from '../../models/iuserbranches';
import * as rights_actions from './rights.actions';
import { iPage } from 'ngx-jrt-controls';

export interface RightsState extends EntityState<iUserBranches> {
  selectid: number;
  search_record: iUserBranches_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};


const adapter: EntityAdapter<iUserBranches> = createEntityAdapter<iUserBranches>({
  selectId: (m) => m.ub_id
});

export const initialState: RightsState = adapter.getInitialState({
  selectid: 0,
  search_record: <iUserBranches_Search>{ user_name: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export const rightsReducer = createReducer<RightsState>(
  initialState,
  on(rights_actions.rights_load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(rights_actions.rights_load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(rights_actions.rights_update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(rights_actions.rights_update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(rights_actions.rights_upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(rights_actions.rights_delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(rights_actions.rights_sort, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const RightsFeatureName = 'rightsState';
export const rightsFeature = createFeatureSelector<RightsState>(RightsFeatureName);
