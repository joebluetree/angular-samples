import { createAction, props } from '@ngrx/store';
import { iModulem } from '../../models/imodulem';

export const module_load_records = createAction(
  '[Module Master] Load Records'
);

export const module_load_success = createAction(
  '[Module Master] Load Success',
  props<{ records: iModulem[] }>()
);

export const module_load_failure = createAction(
  '[Module Master] Load Error',
  props<{ erorr: string }>()
);
