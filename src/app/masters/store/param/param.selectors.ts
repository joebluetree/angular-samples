import { createSelector } from '@ngrx/store';
import { ParamGroupState, paramFeature, selectAll } from './param.reducer';
import { SelectRouterQueryParam } from 'src/app/store';

export const selectParamState = createSelector(
  paramFeature,
  SelectRouterQueryParam,
  (state: ParamGroupState, url: any) => {
    if (Object.keys(url).length === 0) {
      return state['DEFAULT'];
    }
    else {
      return state[url.type];
    }
  }
)

export const selectParamRecords = createSelector(
  selectParamState,
  selectAll
)

export const selectParamRowId = createSelector(
  selectParamState,
  (a) => a.selectid
)

export const selectParamSearch_Record = createSelector(
  selectParamState,
  (a) => a.search_record
)

export const selectParamPage = createSelector(
  selectParamState,
  (a) => a.page
)

export const selectParamPage_SortColumn = createSelector(
  selectParamState,
  (a) => a.sort_column
)

export const selectParamPage_SortOrder = createSelector(
  selectParamState,
  (a) => a.sort_order
)
