import { createAction, props } from '@ngrx/store';
import { iBranchm, iBranchm_Search } from '../../models/ibranchm';
import { iPage } from '../../../library/models/ipage';

export const branch_load_records = createAction(
  '[Branch Master] Load Records',
  props<{ action: string }>()
);

export const branch_load_success = createAction(
  '[Branch Master] Load Success',
  props<{ records: iBranchm[], page: iPage }>()
);

export const branch_load_failure = createAction(
  '[Branch Master] Load Error',
  props<{ erorr: string }>()
);

export const branch_update_selected_rowid = createAction(
  '[Branch Master] Update Selected Row Id',
  props<{ id: number }>()
)

export const branch_update_search = createAction(
  '[Branch Master] Update Search',
  props<{ search_record: iBranchm_Search }>()
);

export const branch_upsert_row = createAction(
  '[Branch Master] Add / Update Row',
  props<{ record: iBranchm }>()
);

export const branch_delete = createAction(
  '[Branch Master] Delete',
  props<{ id: number }>()
);

export const branch_delete_complete = createAction(
  '[Branch Master] Delete Complete',
  props<{ id: number }>()
);

export const branch_sort = createAction(
  '[Branch Master] Sort Column',
  props<{ sort_column: string, sort_order: string }>()
);
