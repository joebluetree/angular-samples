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
  }
);

export const SelectRouterParam = createSelector(
  getRouterState,
  (router) => {
    return (router && router.state && router.state.params) || {}
  }
);
