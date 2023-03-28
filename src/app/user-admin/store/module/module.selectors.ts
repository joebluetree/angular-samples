import { createSelector } from '@ngrx/store';
import { userAdminFeature } from '../index';
import { selectAll } from './module.reducer';



export const moduleFeature = createSelector(
  userAdminFeature, (f) => f.modulemState
)

export const moduleSelector = createSelector(
  moduleFeature, selectAll
)
