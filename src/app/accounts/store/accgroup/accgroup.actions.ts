import { createAction, props } from '@ngrx/store';
import { iAccGroupm, iAccGroupm_Search } from '../../models/iaccgroupm';
import { iPage } from 'ngx-jrt-controls';

export const accgroup_load_records = createAction(
  '[AccGroup Master] Load Records',
  props<{ action: string }>()
);

export const accgroup_load_success = createAction(
  '[AccGroup Master] Load Success',
  props<{ records: iAccGroupm[], page: iPage }>()
);

export const accgroup_load_failure = createAction(
  '[AccGroup Master] Load Error',
  props<{ erorr: string }>()
);

export const accgroup_update_selected_rowid = createAction(
  '[AccGroup Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const accgroup_update_search = createAction(
  '[AccGroup Master] Update Search',
  props<{ search_record: iAccGroupm_Search }>()
);

export const accgroup_upsert_row = createAction(
  '[AccGroup Master] Add / Update Row',
  props<{ record: iAccGroupm }>()
);

export const accgroup_delete = createAction(
  '[AccGroup Master] Delete',
  props<{ id: number }>()
);

export const accgroup_delete_complete = createAction(
  '[AccGroup Master] Delete Complete',
  props<{ id: number }>()
);

export const accgroup_sort = createAction(
  '[AccGroup Master] Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
