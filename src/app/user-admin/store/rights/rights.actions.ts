import { createAction, props } from '@ngrx/store';
import { iUserBranches, iUserBranches_Search } from '../../models/iuserbranches';
import { iPage } from 'ngx-jrt-controls';

const prefix = '[Rights Master] ';
export const load_records = createAction(
  prefix + 'Load Records',
  props<{ action: string }>()
);

export const load_success = createAction(
  prefix + 'Load Success',
  props<{ records: iUserBranches[], page: iPage }>()
);

export const load_failure = createAction(
  prefix + 'Load Error',
  props<{ erorr: string }>()
);

export const update_selected_rowid = createAction(
  prefix + 'Update Selected Row Id',
  props<{ id: number }>()
)

export const update_search = createAction(
  prefix + 'Update Search',
  props<{ search_record: iUserBranches_Search }>()
);

export const upsert_row = createAction(
  prefix + 'Add / Update Row',
  props<{ record: iUserBranches }>()
);

export const delete_record = createAction(
  prefix + 'Delete',
  props<{ id: number }>()
);

export const delete_complete = createAction(
  prefix + 'Delete Complete',
  props<{ id: number }>()
);

export const sort_records = createAction(
  prefix + 'Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
