import { createSelector } from '@ngrx/store';
import { userAdminFeature } from '../index';
import { selectAll } from './module.reducer';

export const moduleFeature = createSelector(
  userAdminFeature, (f) => f.modulemState
)

export const moduleSelector = createSelector(
  moduleFeature, selectAll
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
