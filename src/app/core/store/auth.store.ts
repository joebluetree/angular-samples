import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { iUser } from '../models/user';

//actions
export const auth_login = createAction(
  '[Auth] Login',
  props<{ user: iUser }>()
);
export const auth_logout = createAction('[Auth] Logout')

// reducers

interface AuthState {
  user?: iUser
}

const initialState: AuthState = {
  user: undefined
}

export const authReducer = createReducer<AuthState>(
  initialState,
  on(auth_login, (state, payload) => ({
    ...state, payload
  })),
  on(auth_logout, (state) => ({
    ...state, initialState
  })),
)

// selectors
export const AUTH_FEATURE_NAME = "auth";
const authFeatuerSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_NAME);

export const selectIsLogin = createSelector(
  authFeatuerSelector,
  (authState) => authState.user ? true : false
);

export const selectIsLogout = createSelector(
  selectIsLogin,
  (isLoggedIn) => !!isLoggedIn
);

