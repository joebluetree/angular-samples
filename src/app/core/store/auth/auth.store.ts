import { createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { iUser } from '../../models/user';
import { auth_login_success, auth_login_failure, auth_logout } from './auth.actions';

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
    console.log('login success ', payload.user);
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



