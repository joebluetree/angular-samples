import { createSelector } from '@ngrx/store';
import { ModuleState, moduleFeature, selectAll } from './module.reducer';

export const selectModule = createSelector(
  moduleFeature,
  selectAll
)

export const selectModuleState = createSelector(
  moduleFeature,
  (state: ModuleState) => state
)


export const selectModuleSearch_Record = createSelector(
  moduleFeature,
  (a) => a.search_record
)

export const selectModulePage = createSelector(
  moduleFeature,
  (a) => a.page
)

export const selectModulePage_RowId = createSelector(
  moduleFeature,
  (a) => a.selectid
)

export const selectModulePage_SortColumn = createSelector(
  moduleFeature,
  (a) => a.sort_column
)

export const selectModulePage_SortOrder = createSelector(
  moduleFeature,
  (a) => a.sort_order
)
