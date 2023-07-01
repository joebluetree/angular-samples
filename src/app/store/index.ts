import { isDevMode } from '@angular/core';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../custom-route-serializer';

export interface AppState {
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const SelectRouterParam = createSelector(
  getRouterState,
  (router) => {
    if (router) {
      return router.state.queryParams;
    }
    else
      return null;
  }
);


// export const SelectID = createSelector(
//   getRouterState,
//   (router) => {
//     if (router.state) {
//       return router.state.queryParams.id;
//     }
//     else
//       return null;
//   }
// );

// export const SelectMenuID = createSelector(
//   getRouterState,
//   (router) => {
//     if (router.state) {
//       return router.state.queryParams.menu_id;
//     }
//     else
//       return null;
//   }
// );

// export const SelectMenuParam = createSelector(
//   getRouterState,
//   (router) => {
//     if (router.state) {
//       return router.state.queryParams.menu_param;
//     }
//     else
//       return null;
//   }
// );
