import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iBranchm, iBranchm_Search } from '../../models/ibranchm';
import * as branch_actions from './branch.actions';
import { iPage } from 'ngx-jrt-controls';

export interface BranchState extends EntityState<iBranchm> {
  selectid: number;
  search_record: iBranchm_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};


const adapter: EntityAdapter<iBranchm> = createEntityAdapter<iBranchm>({
  selectId: (m) => m.branch_id
});

export const initialState: BranchState = adapter.getInitialState({
  selectid: 0,
  search_record: <iBranchm_Search>{ branch_name: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export const Reducer = createReducer<BranchState>(
  initialState,
  on(branch_actions.load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(branch_actions.load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(branch_actions.update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(branch_actions.update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(branch_actions.upsert_row, (state, action) => {
    return adapter.upsertOne(action.record, state)
  }),
  on(branch_actions.delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),
  on(branch_actions.sort_data, (state, action) => {
    return { ...state, sort_column: action.sort_column, sort_order: action.sort_order }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const FeatureName = 'branchState';
export const Feature = createFeatureSelector<BranchState>(FeatureName);
