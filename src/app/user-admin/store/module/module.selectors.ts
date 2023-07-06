import { createSelector } from '@ngrx/store';
import { ModuleState, moduleFeature, selectAll } from './module.reducer';
import { SelectRouterQueryParam } from 'src/app/store';


export const moduleSelector = createSelector(
  moduleFeature,
  selectAll
)

export const moduleState = createSelector(
  moduleFeature,
  (state: ModuleState) => state
)

export const moduleSelectedRowId = createSelector(
  moduleFeature,
  (a) => a.selectid
)

export const moduleSearch_Record = createSelector(
  moduleFeature,
  (a) => a.search_record
)

export const modulePage = createSelector(
  moduleFeature,
  (a) => a.page
)

export const modulePage_SortColumn = createSelector(
  moduleFeature,
  (a) => a.sort_column
)

export const modulePage_SortOrder = createSelector(
  moduleFeature,
  (a) => a.sort_order
)
