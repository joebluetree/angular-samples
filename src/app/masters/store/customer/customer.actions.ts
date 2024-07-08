import { createAction, props } from '@ngrx/store';
import { iCustomerm, iCustomerm_Search } from '../../models/icustomerm';
import { iPage } from 'ngx-jrt-controls';

const prefix = '[Customer Master] ';

export const load_records = createAction(
  prefix + 'Load Records',
  props<{ action: string, row_type: string }>()
);

export const load_success = createAction(
  prefix + 'Load Success',
  props<{ records: iCustomerm[], page: iPage, row_type: string }>()
);

export const load_failure = createAction(
  prefix + 'Load Error',
  props<{ erorr: string }>()
);

export const update_selected_rowid = createAction(
  prefix + 'Update Selected Row Id',
  props<{ id: number, row_type: string }>()
)

export const update_search = createAction(
  prefix + 'Update Search',
  props<{ search_record: iCustomerm_Search, row_type: string }>()
);

export const upsert_row = createAction(
  prefix + 'Add / Update Row',
  props<{ record: iCustomerm, row_type: string }>()
);

export const delete_record = createAction(
  prefix + 'Delete',
  props<{ id: number, row_type: string }>()
);

export const delete_complete = createAction(
  prefix + 'Delete Complete',
  props<{ id: number, row_type: string }>()
);

export const sort_records = createAction(
  prefix + 'Sort Column',
  props<{ sort_column: string, sort_order: string, row_type: string }>()
);
