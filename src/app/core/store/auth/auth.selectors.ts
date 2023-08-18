import { createSelector } from '@ngrx/store';
import { CoreFeatureSelector } from '../index';

export const AuthStateSelector = createSelector(
  CoreFeatureSelector,
  (coreSelectore) => coreSelectore.auth
);

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

export const selectMenuList = createSelector(
  AuthStateSelector,
  (state) => state.user?.user_menu_list
);
