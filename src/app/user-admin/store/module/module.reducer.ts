import { createReducer, on, createSelector, select } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { module_load_success, module_load_failure, module_update_selected_rowid, module_update_search } from './module.actions';
import { iPage } from 'src/app/shared/models/ipage';


export interface ModuleState extends EntityState<iModulem> {
  selectid: number;
  search_record: iModulem_Search;
  page: iPage
  error: string;
};

const adapter: EntityAdapter<iModulem> = createEntityAdapter<iModulem>({
  selectId: (m) => m.module_id
});

export const initialState: ModuleState = adapter.getInitialState({
  selectid: 0,
  search_record: { module_name: '', module_is_installed: 'NA', user_action: '' },
  page: { action: '', page_current: 0, page_count: 0, page_rows: 0, page_rows_total: 0 },
  error: ''
});

export const moduleReducer = createReducer<ModuleState>(
  initialState,
  on(module_load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, error: '' });
  }),
  on(module_load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(module_update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(module_update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();





