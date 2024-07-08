import { createSelector } from '@ngrx/store';
import { CustomermGroupState, Feature, selectAll } from './customer.reducer';
import { selectRouterQueryParam } from 'src/app/store';

const url_path = 'customerList';

export const select_Type = createSelector(
  selectRouterQueryParam,
  (routerState: any) => {
    if (routerState.url?.includes(url_path))
      return routerState.queryParams.type;
    else
      return undefined;
  }
)

export const select_GroupState = createSelector(
  Feature,
  select_Type,
  (state: CustomermGroupState, type: string) => {
    return state[type || 'DEFAULT'];
  }
)

export const select_Records = createSelector(
  select_GroupState,
  selectAll
)

export const select_Search_Record = createSelector(
  select_GroupState,
  (a) => a.search_record
)

export const select_Page = createSelector(
  select_GroupState,
  (a) => a.page
)

export const select_Page_RowId = createSelector(
  select_GroupState,
  (a) => a.selectid
)

export const select_Page_SortColumn = createSelector(
  select_GroupState,
  (a) => a.sort_column
)

export const select_Page_SortOrder = createSelector(
  select_GroupState,
  (a) => a.sort_order
)
