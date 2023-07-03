import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../custom-route-serializer';

export interface AppState {
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [resetState];

export const auth_logout = '[Auth] Logout';

export function resetState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    if (action.type === auth_logout) {
      state = {} as AppState;
    }
    return reducer(state, action);
  };
}


export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const SelectRouterQueryParam = createSelector(
  getRouterState,
  (router) => {
    return (router && router.state && router.state.queryParams) || {}
    // console.log('router ', router)
    // if (router) {
    //   return router.state.queryParams;
    // }
    // else
    //   return null;
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
