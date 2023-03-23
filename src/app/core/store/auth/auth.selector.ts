import { createSelector } from '@ngrx/store';
import { AuthStateSelector } from '../index';


export const selectIsLogin = createSelector(
  AuthStateSelector,
  (state) => state.user ? true : false
);

export const selectIsLogout = createSelector(
  selectIsLogin,
  (isLoggedIn) => !isLoggedIn
);

export const selectUserName = createSelector(
  AuthStateSelector,
  (state) => state.user?.user_name
);

export const selectLoginError = createSelector(
  AuthStateSelector,
  (state) => state.error
);
