import { createSelector } from '@ngrx/store';
import { ParamState, paramFeature, selectAll } from './param.reducer';


export const paramSelector = createSelector(
  paramFeature,
  selectAll
)

export const paramState = createSelector(
  paramFeature,
  (state: ParamState) => state
)

export const paramSelectedRowId = createSelector(
  paramFeature,
  (a) => a.selectid
)

export const paramSearch_Record = createSelector(
  paramFeature,
  (a) => a.search_record
)

export const paramPage = createSelector(
  paramFeature,
  (a) => a.page
)

export const paramPage_SortColumn = createSelector(
  paramFeature,
  (a) => a.sort_column
)

export const paramPage_SortOrder = createSelector(
  paramFeature,
  (a) => a.sort_order
)
