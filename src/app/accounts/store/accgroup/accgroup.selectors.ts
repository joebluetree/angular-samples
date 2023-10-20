import { createSelector } from '@ngrx/store';
import { AccGroupState, accgroupFeature, selectAll } from './accgroup.reducer';

export const selectAccGroup = createSelector(
  accgroupFeature,
  selectAll
)

export const selectAccGroupState = createSelector(
  accgroupFeature,
  (state: AccGroupState) => state
)

export const selectAccGroupSearch_Record = createSelector(
  accgroupFeature,
  (a) => a.search_record
)

export const selectAccGroupPage = createSelector(
  accgroupFeature,
  (a) => a.page
)

export const selectAccGroupPage_RowId = createSelector(
  accgroupFeature,
  (a) => a.selectid
)

export const selectAccGroupPage_SortColumn = createSelector(
  accgroupFeature,
  (a) => a.sort_column
)

export const selectAccGroupPage_SortOrder = createSelector(
  accgroupFeature,
  (a) => a.sort_order
)
