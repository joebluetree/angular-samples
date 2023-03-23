import { AuthState, authReducer } from './auth/auth.store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CoreState {
  auth: AuthState
}

export const coreReducers: ActionReducerMap<CoreState> = {
  auth: authReducer
}

export const CORE_FEATURE_NAME = "core";

export const CoreFeatureSelector = createFeatureSelector<CoreState>(CORE_FEATURE_NAME);

// selectors


export const selectIsLogin = createSelector(
  CoreFeatureSelector,
  (coreState) => coreState.auth.user ? true : false
);

export const selectIsLogout = createSelector(
  selectIsLogin,
  (isLoggedIn) => !isLoggedIn
);

export const selectUserName = createSelector(
  CoreFeatureSelector,
  (authState) => authState.auth.user?.user_name
);

export const selectLoginError = createSelector(
  CoreFeatureSelector,
  (authState) => authState.auth.error
);
