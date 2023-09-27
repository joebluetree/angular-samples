
import { createAction, props } from '@ngrx/store';
import { iParam, iParam_Search } from '../../models/iparam';
import { iPage } from 'ngx-jrt-controls';

export const param_load_records = createAction(
  '[Param Master] Load Records',
  props<{ action: string, param_type: string }>()
);

export const param_load_success = createAction(
  '[Param Master] Load Success',
  props<{ records: iParam[], page: iPage, param_type: string }>()
);

export const param_load_failure = createAction(
  '[Param Master] Load Error',
  props<{ erorr: string }>()
);

export const param_update_selected_rowid = createAction(
  '[Param Master] Update Selected Row Id',
  props<{ id: number, param_type: string }>()
)

export const param_update_search = createAction(
  '[Param Master] Update Search',
  props<{ search_record: iParam_Search, param_type: string }>()
);

export const param_upsert_row = createAction(
  '[Param Master] Add / Update Row',
  props<{ record: iParam, param_type: string }>()
);

export const param_delete = createAction(
  '[Param Master] Delete',
  props<{ id: number, param_type: string }>()
);

export const param_delete_complete = createAction(
  '[Param Master] Delete Complete',
  props<{ id: number, param_type: string }>()
);

export const param_sort = createAction(
  '[Param Master] Sort Column',
  props<{ sort_column: string, sort_order: string, param_type: string }>()
);
