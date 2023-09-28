import { createSelector } from '@ngrx/store';
import { CoreFeatureSelector } from './index';
import { iMenum } from 'src/app/user-admin/models/imenum';

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
  (state) => {
    console.log(state);
    return state.user?.user_menu_list as iMenum[]
  }
);

export const selectModuleList = createSelector(
  selectMenuList,
  (data) => {
    console.log('data', data);
    if (!data)
      return [];
    let list: any[] = [];
    const _list = data.reduce((acc: any, value: iMenum) => {
      let id = value.menu_module_id;
      if (!acc[id]) {
        acc[id] = value.menu_module_name;
        list.push({ id: id, name: value.menu_module_name })
      }
      return acc;
    }, {});
    return list;
  }
);




