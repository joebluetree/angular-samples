import { createSelector } from '@ngrx/store';
import { UserState, userFeature, selectAll } from './user.reducer';

export const selectUser = createSelector(
  userFeature,
  selectAll
)

export const selectUserState = createSelector(
  userFeature,
  (state: UserState) => state
)

export const selectUserSearch_Record = createSelector(
  userFeature,
  (a) => a.search_record
)

export const selectUserPage = createSelector(
  userFeature,
  (a) => a.page
)

export const selectUserPage_RowId = createSelector(
  userFeature,
  (a) => a.selectid
)

export const selectUserPage_SortColumn = createSelector(
  userFeature,
  (a) => a.sort_column
)

export const selectUserPage_SortOrder = createSelector(
  userFeature,
  (a) => a.sort_order
)
