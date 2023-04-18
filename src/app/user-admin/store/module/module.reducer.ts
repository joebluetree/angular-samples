import { createReducer, on, createSelector, select, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { module_load_success, module_load_failure, module_update_selected_rowid, module_update_search, module_upsert_row, module_delete, module_delete_complete } from './module.actions';
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
  search_record: <iModulem_Search>{ module_name: '', module_is_installed: 'NA' },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  error: ''
});

export const moduleReducer = createReducer<ModuleState>(
  initialState,
  on(module_load_success, (state, action) => {
    return adapter.setAll(action.records, { ...state, page: action.page, error: '' });
  }),
  on(module_load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  on(module_update_selected_rowid, (state, action) => {
    return { ...state, selectid: action.id };
  }),
  on(module_update_search, (state, action) => {
    return { ...state, search_record: action.search_record }
  }),
  on(module_delete_complete, (state, action) => {
    return adapter.removeOne(action.id, state);
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const ModuleFeatureName = 'moduleState';
export const moduleFeature = createFeatureSelector<ModuleState>(ModuleFeatureName);
