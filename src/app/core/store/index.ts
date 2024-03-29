import { AuthState, authReducer } from './auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface CoreState {
  auth: AuthState
}

export const coreReducers: ActionReducerMap<CoreState> = {
  auth: authReducer
}

export const CORE_FEATURE_NAME = "core";

export const CoreFeatureSelector = createFeatureSelector<CoreState>(CORE_FEATURE_NAME);


