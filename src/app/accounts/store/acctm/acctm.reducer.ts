import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iAcctm, iAcctm_Search } from '../../models/iacctm';
import * as allActions from './acctm.actions';
import { iPage } from 'ngx-jrt-controls';

export interface AcctmState extends EntityState<iAcctm> {
  selectid: number;
  row_type: string;
  search_record: iAcctm_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};

const adapter: EntityAdapter<iAcctm> = createEntityAdapter<iAcctm>({
  selectId: (m) => m.acc_id
});

export const initialAcctmState: AcctmState = adapter.getInitialState({
  selectid: 0,
  row_type: '',
  search_record: <iAcctm_Search>{ acc_name: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export interface AcctmGroupState {
  [params: string]: AcctmState
}

export const InitialAcctmGroupState: AcctmGroupState = {
  'DEFAULT': initialAcctmState,
  'MAIN-CODE': initialAcctmState,
  'ACC-CODE': initialAcctmState,
}


export const Reducer = createReducer<AcctmGroupState>(
  InitialAcctmGroupState,
  on(allActions.load_success, (state, action) => {

    return {
      ...state,
      [action.row_type]: adapter.setAll(action.records, { ...state[action.row_type], page: action.page, error: '' })
    }
  }),
  /*
  on(allActions.load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  */
  on(allActions.update_selected_rowid, (state, action) => {
    return { ...state, [action.row_type]: { ...state[action.row_type], selectid: action.id } };
  }),
  on(allActions.update_search, (state, action) => {
    return { ...state, [action.row_type]: { ...state[action.row_type], search_record: action.search_record } };
  }),
  on(allActions.upsert_row, (state, action) => {
    return {
      ...state,
      [action.row_type]: adapter.upsertOne(action.record, state[action.row_type])
    }
  }),
  on(allActions.delete_complete, (state, action) => {
    return {
      ...state,
      [action.row_type]: adapter.removeOne(action.id, state[action.row_type])
    }
  }),
  on(allActions.sort_records, (state, action) => {
    return {
      ...state,
      [action.row_type]: { ...state[action.row_type], sort_column: action.sort_column, sort_order: action.sort_order }
    }
  })

)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const FeatureName = 'acctmGroupState';
export const Feature = createFeatureSelector<AcctmGroupState>(FeatureName);


