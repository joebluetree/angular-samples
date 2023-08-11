import { createSelector } from '@ngrx/store';
import { MenuState, menuFeature, selectAll } from './menu.reducer';

export const selectMenu = createSelector(
  menuFeature,
  selectAll
)

export const selectMenuState = createSelector(
  menuFeature,
  (state: MenuState) => state
)

export const selectMenuPage_RowId = createSelector(
  menuFeature,
  (a) => a.selectid
)

export const selectMenuSearch_Record = createSelector(
  menuFeature,
  (a) => a.search_record
)

export const selectMenuPage = createSelector(
  menuFeature,
  (a) => a.page
)

export const selectMenuPage_SortColumn = createSelector(
  menuFeature,
  (a) => a.sort_column
)

export const selectMenuPage_SortOrder = createSelector(
  menuFeature,
  (a) => a.sort_order
)
