import * as fromModules from './module/module.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface UserAdminState {
  modulemState: fromModules.ModuleState
}

export const reducers: ActionReducerMap<UserAdminState> = {
  modulemState: fromModules.moduleReducer
}

export const UserAdminFeatureName = 'useradmin';

export const userAdminFeature = createFeatureSelector<UserAdminState>(UserAdminFeatureName);

