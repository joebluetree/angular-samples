import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as  accgroup_actions from './accgroup.actions';
import { AccGroupService } from '../../services/accgroupm.service';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccGroupState } from './accgroup.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { selectAccGroupPage, selectAccGroupSearch_Record } from './accgroup.selectors';

@Injectable()
export class AccGroupEffects {
  accGroupList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accgroup_actions.load_records),
      withLatestFrom(
        this.store.select(selectAccGroupSearch_Record),
        this.store.select(selectAccGroupPage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(accgroup_actions.load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  accGroupDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accgroup_actions.delete_record),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(accgroup_actions.delete_complete({ id: result.id }));
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
    private service: AccGroupService,
    private store: Store<AccGroupState>,
    private gs: GlobalService
  ) {
  }

}
