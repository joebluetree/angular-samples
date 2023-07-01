import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iParam, iParam_Search } from '../../models/iparam';
import { param_load_success, param_load_failure, param_update_selected_rowid, param_update_search, param_upsert_row, param_delete_complete, param_sort } from './param.actions';
import { iPage } from 'src/app/shared/models/ipage';

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
  search_record: <iParam_Search>{ param_code: '', param_name: '', },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: 'param_order',
  sort_order: 'asc',
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

export const paramReducer = createReducer<ParamGroupState>(
  InitialParamGroupState,
  on(param_load_success, (state, action) => {
    return {
      ...state,
      [action.param_type]: adapter.setAll(action.records, { ...state[action.param_type], page: action.page, error: '' })
    }
  }),
  // on(param_load_failure, (state, action) => {
  //   return adapter.removeAll({ ...state, error: action.erorr })
  // }),
  // on(param_update_selected_rowid, (state, action) => {
  //   return { ...state, selectid: action.id };
  // }),
  // on(param_update_search, (state, action) => {
  //   return { ...state, search_record: action.search_record }
  // }),
  // on(param_upsert_row, (state, action) => {
  //   return adapter.upsertOne(action.record, state)
  // }),
  // on(param_delete_complete, (state, action) => {
  //   return adapter.removeOne(action.id, state);
  // }),
  // on(param_sort, (state, action) => {
  //   let colName = action.colName;
  //   let colOrder = 'asc';
  //   if (colName == state.sort_column)
  //     colOrder = state.sort_order == 'asc' ? 'desc' : 'asc';
  //   return { ...state, sort_column: action.colName, sort_order: colOrder }
  // })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const paramFeatureName = 'paramState';
export const paramFeature = createFeatureSelector<ParamGroupState>(paramFeatureName);

