import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as allActions from './module.actions';
import { ModuleService } from '../../services/module.service';
import { EMPTY, catchError, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { select_Page, select_Search_Record } from './module.selectors';


@Injectable()
export class ModuleEffects {
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
    private service: ModuleService,
    private store: Store<ModuleState>,
    private gs: GlobalService
  ) {
  }
}

