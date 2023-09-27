import { createAction, props } from '@ngrx/store';
import { iUserBranches, iUserBranches_Search } from '../../models/iuserbranches';
import { iPage } from 'ngx-jrt-controls';


export const rights_load_records = createAction(
  '[Rights Master] Load Records',
  props<{ action: string }>()
);

export const rights_load_success = createAction(
  '[Rights Master] Load Success',
  props<{ records: iUserBranches[], page: iPage }>()
);

export const rights_load_failure = createAction(
  '[Rights Master] Load Error',
  props<{ erorr: string }>()
);

export const rights_update_selected_rowid = createAction(
  '[Rights Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const rights_update_search = createAction(
  '[Rights Master] Update Search',
  props<{ search_record: iUserBranches_Search }>()
);

export const rights_upsert_row = createAction(
  '[Rights Master] Add / Update Row',
  props<{ record: iUserBranches }>()
);

export const rights_delete = createAction(
  '[Rights Master] Delete',
  props<{ id: number }>()
);

export const rights_delete_complete = createAction(
  '[Rights Master] Delete Complete',
  props<{ id: number }>()
);

export const rights_sort = createAction(
  '[rights Master] Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
