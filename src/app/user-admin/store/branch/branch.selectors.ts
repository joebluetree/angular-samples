import { createSelector } from '@ngrx/store';
import { BranchState, branchFeature, selectAll } from './branch.reducer';

export const selectBranch = createSelector(
  branchFeature,
  selectAll
)

export const selectBranchState = createSelector(
  branchFeature,
  (state: BranchState) => state
)

export const selectBranchSearch_Record = createSelector(
  branchFeature,
  (a) => a.search_record
)

export const selectBranchPage = createSelector(
  branchFeature,
  (a) => a.page
)

export const selectBranchPage_RowId = createSelector(
  branchFeature,
  (a) => a.selectid
)

export const selectBranchPage_SortColumn = createSelector(
  branchFeature,
  (a) => a.sort_column
)

export const selectBranchPage_SortOrder = createSelector(
  branchFeature,
  (a) => a.sort_order
)
