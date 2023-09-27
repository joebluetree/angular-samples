import { createAction, props } from '@ngrx/store';
import { iUserm, iUserm_Search } from '../../models/iuserm';
import { iPage } from '../../../library/models/ipage';


export const user_load_records = createAction(
  '[User Master] Load Records',
  props<{ action: string }>()
);

export const user_load_success = createAction(
  '[User Master] Load Success',
  props<{ records: iUserm[], page: iPage }>()
);

export const user_load_failure = createAction(
  '[User Master] Load Error',
  props<{ erorr: string }>()
);

export const user_update_selected_rowid = createAction(
  '[User Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const user_update_search = createAction(
  '[User Master] Update Search',
  props<{ search_record: iUserm_Search }>()
);

export const user_upsert_row = createAction(
  '[User Master] Add / Update Row',
  props<{ record: iUserm }>()
);

export const user_delete = createAction(
  '[User Master] Delete',
  props<{ id: number }>()
);

export const user_delete_complete = createAction(
  '[User Master] Delete Complete',
  props<{ id: number }>()
);

export const user_sort = createAction(
  '[User Master] Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
