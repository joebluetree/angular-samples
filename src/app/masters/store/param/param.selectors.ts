import { createSelector } from '@ngrx/store';
import { ParamGroupState, paramFeature, selectAll } from './param.reducer';
import { SelectRouterParam } from 'src/app/store';

export const paramStateSelector = createSelector(
  paramFeature,
  SelectRouterParam,
  (state: ParamGroupState, url: any) => {
    if (url)
      return state[url.type];
    else
      return state['DEFAULT'];
  }
)

export const paramRecords = createSelector(
  paramStateSelector,
  selectAll
)

export const paramSelectedRowId = createSelector(
  paramStateSelector,
  (a) => a.selectid
)

export const paramSearch_Record = createSelector(
  paramStateSelector,
  (a) => a.search_record
)

export const paramPage = createSelector(
  paramStateSelector,
  (a) => a.page
)

export const paramPage_SortColumn = createSelector(
  paramStateSelector,
  (a) => a.sort_column
)

export const paramPage_SortOrder = createSelector(
  paramStateSelector,
  (a) => a.sort_order
)
