
import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iModulem } from '../../models/imodulem';
import { module_load_success, module_load_failure } from './module.actions';

export interface ModuleState extends EntityState<iModulem> {
  error: string;
};

const adapter: EntityAdapter<iModulem> = createEntityAdapter<iModulem>();

export const initialState: ModuleState = adapter.getInitialState({
  error: ''
});

export const moduleReducer = createReducer<ModuleState>(
  initialState,
  on(module_load_success, (state, payload) => {
    return adapter.setAll(payload.records, { ...state, error: '' });
  }),
  on(module_load_failure, (state, payload) => {
    return adapter.removeAll({ ...state, error: payload.erorr })
  })
)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();






