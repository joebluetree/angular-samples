import { RouterReducerState } from '@ngrx/router-store';
import { AuthState, authReducer } from './auth/auth.store';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/custom-route-serializer';

export interface CoreState {
  auth: AuthState
}

export const coreReducers: ActionReducerMap<CoreState> = {
  auth: authReducer
}

export const CORE_FEATURE_NAME = "core";

export const CoreFeatureSelector = createFeatureSelector<CoreState>(CORE_FEATURE_NAME);


