import { createSelector } from '@ngrx/store';
import { ParamGroupState, paramFeature, selectAll } from './param.reducer';
import { selectRouterQueryParam } from 'src/app/store';

const url_path = 'paramList';

export const selectParamType = createSelector(
  selectRouterQueryParam,
  (routerState: any) => {
    if (routerState.url?.includes(url_path))
      return routerState.queryParams.type;
    else
      return undefined;
  }
)

export const selectParamGroupState = createSelector(
  paramFeature,
  selectParamType,
  (state: ParamGroupState, type: string) => {
    return state[type || 'DEFAULT'];
  }
)

export const selectParamRecords = createSelector(
  selectParamGroupState,
  selectAll
)

export const selectParamSearch_Record = createSelector(
  selectParamGroupState,
  (a) => a.search_record
)

export const selectParamPage = createSelector(
  selectParamGroupState,
  (a) => a.page
)

export const selectParamPage_RowId = createSelector(
  selectParamGroupState,
  (a) => a.selectid
)

export const selectParamPage_SortColumn = createSelector(
  selectParamGroupState,
  (a) => a.sort_column
)

export const selectParamPage_SortOrder = createSelector(
  selectParamGroupState,
  (a) => a.sort_order
)
