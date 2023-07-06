import { createSelector } from '@ngrx/store';
import { ParamGroupState, paramFeature, selectAll } from './param.reducer';
import { SelectRouterQueryParam } from 'src/app/store';

export const selectParamGroupState = createSelector(
  paramFeature,
  SelectRouterQueryParam,
  (state: ParamGroupState, url: any) => {
    console.log('param selector ', url);
    if (url.type)
      return state[url.type];
    else
      return state['DEFAULT'];
  }
)

export const selectParamRecords = createSelector(
  selectParamGroupState,
  selectAll
)

export const selectParamRowId = createSelector(
  selectParamGroupState,
  (a) => a.selectid
)

export const selectParamSearch_Record = createSelector(
  selectParamGroupState,
  (a) => a.search_record
)

export const selectParamPage = createSelector(
  selectParamGroupState,
  (a) => a.page
)

export const selectParamPage_SortColumn = createSelector(
  selectParamGroupState,
  (a) => a.sort_column
)

export const selectParamPage_SortOrder = createSelector(
  selectParamGroupState,
  (a) => a.sort_order
)
