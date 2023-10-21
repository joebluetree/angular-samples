import { createSelector } from '@ngrx/store';
import { ModuleState, Feature, selectAll } from './module.reducer';

export const select_Records = createSelector(
  Feature,
  selectAll
)

export const select_State = createSelector(
  Feature,
  (state: ModuleState) => state
)


export const select_Search_Record = createSelector(
  Feature,
  (a) => a.search_record
)

export const select_Page = createSelector(
  Feature,
  (a) => a.page
)

export const select_Page_RowId = createSelector(
  Feature,
  (a) => a.selectid
)

export const select_Page_SortColumn = createSelector(
  Feature,
  (a) => a.sort_column
)

export const select_Page_SortOrder = createSelector(
  Feature,
  (a) => a.sort_order
)
