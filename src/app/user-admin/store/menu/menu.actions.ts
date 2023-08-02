import { createAction, props } from '@ngrx/store';
import { iMenum, iMenum_Search } from '../../models/imenum';
import { iPage } from 'src/app/shared/models/ipage';

export const menu_load_records = createAction(
  '[Menu Master] Load Records',
  props<{ action: string }>()
);

export const menu_load_success = createAction(
  '[Menu Master] Load Success',
  props<{ records: iMenum[], page: iPage }>()
);

export const menu_load_failure = createAction(
  '[Menu Master] Load Error',
  props<{ erorr: string }>()
);

export const menu_update_selected_rowid = createAction(
  '[Menu Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const menu_update_search = createAction(
  '[Menu Master] Update Search',
  props<{ search_record: iMenum_Search }>()
);

export const menu_upsert_row = createAction(
  '[Menu Master] Add / Update Row',
  props<{ record: iMenum }>()
);

export const menu_delete = createAction(
  '[Menu Master] Delete',
  props<{ id: number }>()
);

export const menu_delete_complete = createAction(
  '[Menu Master] Delete Complete',
  props<{ id: number }>()
);

export const menu_sort = createAction(
  '[Menu Master] Sort Column',
  props<{ sort_column: string, sort_order: string, sort_icon: string }>()
);
