import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { iUser } from '../../models/user';

//actions
export const auth_login = createAction(
  '[Auth] Login',
  props<{ code: string, password: string }>()
);

export const auth_login_success = createAction(
  '[Auth] Login Success',
  props<{ user: iUser }>()
);

export const auth_login_failure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const auth_logout = createAction('[Auth] Logout')

// reducers

export interface AuthState {
  user?: iUser,
  error?: string
}

const initialState: AuthState = {
  user: undefined,
  error: ''
}

export const authReducer = createReducer<AuthState>(
  initialState,
  on(auth_login_success, (state, payload) => {
    console.log('login success ', payload);
    return {
      user: payload.user,
      error: ''
    }
  }),
  on(auth_login_failure, (state, payload) => {
    console.log('login Failure ', payload);
    return {
      user: undefined,
      error: payload.error
    }
  }),
  on(auth_logout, (state) => {
    return initialState;
  }),
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
  (isLoggedIn) => !isLoggedIn
);

export const selectUserName = createSelector(
  authFeatuerSelector,
  (authState) => authState.user?.user_name
);

export const selectLoginError = createSelector(
  authFeatuerSelector,
  (authState) => authState.error
);


