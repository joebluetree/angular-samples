import { RouterStateUrl } from './custom-route-serializer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';


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
      //state = {} as AppState;
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectRouterQueryParam = createSelector(
  getRouterState,
  (router) => {
    //return (router && router.state && router.state.queryParams) || {}
    return (router && router.state) || {}
  }
);

export const selectRouterParam = createSelector(
  getRouterState,
  (router) => {
    return (router && router.state && router.state.params) || {}
  }
);
