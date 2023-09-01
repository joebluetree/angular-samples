import { createSelector } from '@ngrx/store';
import { RightsState, rightsFeature, selectAll } from './rights.reducer';

export const selectRights = createSelector(
  rightsFeature,
  selectAll
)

export const selectRightState = createSelector(
  rightsFeature,
  (state: RightsState) => state
)

export const selectRightsSearch_Record = createSelector(
  rightsFeature,
  (a) => a.search_record
)

export const selectRightsPage = createSelector(
  rightsFeature,
  (a) => a.page
)

export const selectRightsPage_RowId = createSelector(
  rightsFeature,
  (a) => a.selectid
)

export const selectRightsPage_SortColumn = createSelector(
  rightsFeature,
  (a) => a.sort_column
)

export const selectRightsPage_SortOrder = createSelector(
  rightsFeature,
  (a) => a.sort_order
)
