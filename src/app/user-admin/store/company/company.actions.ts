
import { createAction, props } from '@ngrx/store';
import { iCompanym, iCompanym_Search } from '../../models/icompanym';
import { iPage } from 'ngx-jrt-controls';

export const company_load_records = createAction(
  '[Company Master] Load Records',
  props<{ action: string }>()
);

export const company_load_success = createAction(
  '[Company Master] Load Success',
  props<{ records: iCompanym[], page: iPage }>()
);

export const company_load_failure = createAction(
  '[Company Master] Load Error',
  props<{ erorr: string }>()
);

export const company_update_selected_rowid = createAction(
  '[Company Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const company_update_search = createAction(
  '[Company Master] Update Search',
  props<{ search_record: iCompanym_Search }>()
);

export const company_upsert_row = createAction(
  '[Company Master] Add / Update Row',
  props<{ record: iCompanym }>()
);

export const company_delete = createAction(
  '[Company Master] Delete',
  props<{ id: number }>()
);

export const company_delete_complete = createAction(
  '[Company Master] Delete Complete',
  props<{ id: number }>()
);

export const company_sort = createAction(
  '[Company Master] Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
