import { createAction, props } from '@ngrx/store';
import { iModulem, iModulem_Search } from '../../models/imodulem';


export const module_load_records = createAction(
  '[Module Master] Load Records',
  props<{ action: string }>()
);

export const module_load_success = createAction(
  '[Module Master] Load Success',
  props<{ records: iModulem[] }>()
);

export const module_load_failure = createAction(
  '[Module Master] Load Error',
  props<{ erorr: string }>()
);

export const module_update_selected_rowid = createAction(
  '[Module Master] Update Selected Row Id',
  props<{ id: number }>()
)


export const module_update_search = createAction(
  '[Module Master] Update Search',
  props<{ search_record: iModulem_Search }>()
);
