import { createAction, props } from '@ngrx/store';
import { iParam, iParam_Search } from '../../models/iparam';
import { iPage } from 'src/app/shared/models/ipage';

export const param_load_records = createAction(
  '[Param Master] Load Records',
  props<{ action: string }>()
);

export const param_load_success = createAction(
  '[Param Master] Load Success',
  props<{ records: iParam[], page: iPage }>()
);

export const param_load_failure = createAction(
  '[Param Master] Load Error',
  props<{ erorr: string }>()
);

export const param_update_selected_rowid = createAction(
  '[Param Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const param_update_search = createAction(
  '[Param Master] Update Search',
  props<{ search_record: iParam_Search }>()
);

export const param_upsert_row = createAction(
  '[Param Master] Add / Update Row',
  props<{ record: iParam }>()
);

export const param_delete = createAction(
  '[Param Master] Delete',
  props<{ id: number }>()
);

export const param_delete_complete = createAction(
  '[Param Master] Delete Complete',
  props<{ id: number }>()
);

export const param_sort = createAction(
  '[Param Master] Sort Column',
  props<{ colName: string }>()
);