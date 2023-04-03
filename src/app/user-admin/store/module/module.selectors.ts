import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdminFeature } from '../index';
import { ModuleState, moduleFeature, selectAll } from './module.reducer';


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
