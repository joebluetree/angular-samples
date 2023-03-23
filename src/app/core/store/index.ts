import { AuthState, authReducer } from './auth/auth.store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { core } from '@angular/compiler';

export interface CoreState {
  auth: AuthState
}

export const coreReducers: ActionReducerMap<CoreState> = {
  auth: authReducer
}

export const CORE_FEATURE_NAME = "core";

export const CoreFeatureSelector = createFeatureSelector<CoreState>(CORE_FEATURE_NAME);

export const AuthStateSelector = createSelector(
  CoreFeatureSelector,
  (coreSelectore) => coreSelectore.auth
);

// selectors

