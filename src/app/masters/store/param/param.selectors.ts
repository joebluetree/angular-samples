import { createSelector } from '@ngrx/store';
import { ParamGroupState, paramFeature, selectAll } from './param.reducer';
import { selectRouterQueryParam } from 'src/app/store';

export const selectParamType = createSelector(
  selectRouterQueryParam,
  (url: any) => {
    if (url.url.includes('paramList'))
      return url.queryParams.type;
    else
      return undefined;
  }
)

export const selectParamGroupState = createSelector(
  paramFeature,
  selectParamType,
  (state: ParamGroupState, type: string) => {
    const _data = type || 'DEFAULT';
    console.log('param group ', type, _data);
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
