import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iParam, iParam_Search } from '../../models/iparam';
import * as allActions from './param.actions';
import { iPage } from 'ngx-jrt-controls';

export interface ParamState extends EntityState<iParam> {
  selectid: number;
  param_type: string;
  search_record: iParam_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};

const adapter: EntityAdapter<iParam> = createEntityAdapter<iParam>({
  selectId: (m) => m.param_id
});

export const initialParamState: ParamState = adapter.getInitialState({
  selectid: 0,
  param_type: '',
  search_record: <iParam_Search>{ param_code: '', param_name: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export interface ParamGroupState {
  [params: string]: ParamState
}

export const InitialParamGroupState: ParamGroupState = {
  'DEFAULT': initialParamState,
  'COUNTRY': initialParamState,
  'STATE': initialParamState,
}

export const Reducer = createReducer<ParamGroupState>(
  InitialParamGroupState,
  on(allActions.load_success, (state, action) => {
    return {
      ...state,
      [action.param_type]: adapter.setAll(action.records, { ...state[action.param_type], page: action.page, error: '' })
    }
  }),
  // on(param_load_failure, (state, action) => {
  //   return adapter.removeAll({ ...state, error: action.erorr })
  // }),
  on(allActions.update_selected_rowid, (state, action) => {
    return { ...state, [action.param_type]: { ...state[action.param_type], selectid: action.id } };
  }),
  on(allActions.update_search, (state, action) => {
    return { ...state, [action.param_type]: { ...state[action.param_type], search_record: action.search_record } };
  }),
  on(allActions.upsert_row, (state, action) => {
    return {
      ...state,
      [action.param_type]: adapter.upsertOne(action.record, state[action.param_type])
    }
  }),
  on(allActions.delete_complete, (state, action) => {
    return {
      ...state,
      [action.param_type]: adapter.removeOne(action.id, state[action.param_type])
    }
  }),
  on(allActions.sort_records, (state, action) => {
    return {
      ...state,
      [action.param_type]: { ...state[action.param_type], sort_column: action.sort_column, sort_order: action.sort_order }
    }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
export const FeatureName = 'paramGroupState';
export const Feature = createFeatureSelector<ParamGroupState>(FeatureName);
