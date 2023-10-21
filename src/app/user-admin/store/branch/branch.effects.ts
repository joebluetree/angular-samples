import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as  branch_actions from './branch.actions';
import { BranchService } from '../../services/branch.service';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { BranchState } from './branch.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { select_Page, select_Search_Record } from './branch.selectors';

@Injectable()
export class BranchEffects {
  List$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(branch_actions.load_records),
      withLatestFrom(
        this.store.select(select_Search_Record),
        this.store.select(select_Page)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(branch_actions.load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  Delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(branch_actions.delete_records),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(branch_actions.delete_complete({ id: result.id }));
        else {
          throw new Error(result.message);
        }
      }),
      catchError(error => {
        const err = !!error.error ? error.error : error;
        this.gs.showScreen([err]);
        throw error;
      })
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private service: BranchService,
    private store: Store<BranchState>,
    private gs: GlobalService
  ) {
  }
}
