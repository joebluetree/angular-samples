import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs';

import * as  allActions from './accgroup.actions';
import { AccGroupService } from '../../services/accgroupm.service';
import { AccGroupState } from './accgroup.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { select_Page, select_Search_Record } from './accgroup.selectors';

@Injectable()
export class AccGroupEffects {
  List$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.load_records),
      withLatestFrom(
        this.store.select(select_Search_Record),
        this.store.select(select_Page)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(allActions.load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  Delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.delete_record),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(allActions.delete_complete({ id: result.id }));
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
