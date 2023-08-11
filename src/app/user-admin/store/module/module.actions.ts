import { createAction, props } from '@ngrx/store';
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { iPage } from 'src/app/shared/models/ipage';

export const module_load_records = createAction(
  '[Module Master] Load Records',
  props<{ action: string }>()
);

export const module_load_success = createAction(
  '[Module Master] Load Success',
  props<{ records: iModulem[], page: iPage }>()
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

export const module_upsert_row = createAction(
  '[Module Master] Add / Update Row',
  props<{ record: iModulem }>()
);

export const module_delete = createAction(
  '[Module Master] Delete',
  props<{ id: number }>()
);

export const module_delete_complete = createAction(
  '[Module Master] Delete Complete',
  props<{ id: number }>()
);

export const module_sort = createAction(
  '[Module Master] Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
