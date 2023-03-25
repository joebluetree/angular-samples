import * as fromModules from './module/module.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface UserAdminState {
  modulem: fromModules.ModuleState
}

export const reducers: ActionReducerMap<UserAdminState> = {
  modulem: fromModules.moduleReducer
}

export const moduleFeatureName = 'useradmin'

export const moduleFeature = createFeatureSelector<UserAdminState>(moduleFeatureName);

