import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { param_load_records, param_load_success, param_delete, param_update_search, param_delete_complete } from './param.actions';
import { ParamService } from '../../services/param.service';
import { EMPTY, catchError, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ParamState } from './param.reducer';
import { paramPage, paramSearch_Record } from './param.selectors';
import { GlobalService } from 'src/app/core/services/global.service';


@Injectable()
export class ParamEffects {
  paramList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(param_load_records),
      withLatestFrom(
        this.store.select(paramSearch_Record),
        this.store.select(paramPage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        console.log(data);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(param_load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  paramDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(param_delete),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(param_delete_complete({ id: result.id }));
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
    private service: ParamService,
    private store: Store<ParamState>,
    private gs: GlobalService
  ) {
  }
}
