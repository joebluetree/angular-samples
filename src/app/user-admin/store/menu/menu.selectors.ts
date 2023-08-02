import { createSelector } from '@ngrx/store';
import { MenuState, menuFeature, selectAll } from './menu.reducer';

export const menuSelector = createSelector(
  menuFeature,
  selectAll
)

export const menuState = createSelector(
  menuFeature,
  (state: MenuState) => state
)

export const menuSelectedRowId = createSelector(
  menuFeature,
  (a) => a.selectid
)

export const menuSearch_Record = createSelector(
  menuFeature,
  (a) => a.search_record
)

export const menuPage = createSelector(
  menuFeature,
  (a) => a.page
)

export const menuPage_SortColumn = createSelector(
  menuFeature,
  (a) => a.sort_column
)

export const menuPage_SortOrder = createSelector(
  menuFeature,
  (a) => a.sort_order
)
