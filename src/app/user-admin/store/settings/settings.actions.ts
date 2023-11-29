import { createAction, props } from '@ngrx/store';
import { iSettings, iSettings_Search } from '../../models/isettings';
import { iPage } from 'ngx-jrt-controls';

const prefix = '[Settings] ';

export const load_records = createAction(
  prefix + 'Load Records',
  props<{ action: string, category: string }>()
);

export const load_success = createAction(
  prefix + 'Load Success',
  props<{ records: iSettings[], page: iPage, category: string }>()
);

export const load_failure = createAction(
  prefix + 'Load Error',
  props<{ erorr: string }>()
);

export const update_selected_rowid = createAction(
  prefix + 'Update Selected Row Id',
  props<{ id: number, category: string }>()
)

export const update_search = createAction(
  prefix + 'Update Search',
  props<{ search_record: iSettings_Search, category: string }>()
);

export const upsert_row = createAction(
  prefix + 'Add / Update Row',
  props<{ record: iSettings, category: string }>()
);

export const delete_record = createAction(
  prefix + 'Delete',
  props<{ id: number, category: string }>()
);

export const delete_complete = createAction(
  prefix + 'Delete Complete',
  props<{ id: number, category: string }>()
);

export const sort_records = createAction(
  prefix + 'Sort Column',
  props<{ sort_column: string, sort_order: string, category: string }>()
);

export const update_format = createAction(
  prefix + 'Update Format',
  props<{ category: string }>()
)
