import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iCustomerm, iCustomerm_Search } from '../../models/icustomerm';
import * as allActions from './customer.actions';
import { iPage } from 'ngx-jrt-controls';

export interface CustomermState extends EntityState<iCustomerm> {
  selectid: number;
  row_type: string;
  search_record: iCustomerm_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};

const adapter: EntityAdapter<iCustomerm> = createEntityAdapter<iCustomerm>({
  selectId: (m) => m.cust_id
});

export const initialCustomermState: CustomermState = adapter.getInitialState({
  selectid: 0,
  row_type: '',
  search_record: <iCustomerm_Search>{ cust_name: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export interface CustomermGroupState {
  [params: string]: CustomermState
}

export const InitialCustomermGroupState: CustomermGroupState = {
  'DEFAULT': initialCustomermState,
  'CUSTOMER': initialCustomermState,
}


export const Reducer = createReducer<CustomermGroupState>(
  InitialCustomermGroupState,
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

export const FeatureName = 'customermGroupState';
export const Feature = createFeatureSelector<CustomermGroupState>(FeatureName);


