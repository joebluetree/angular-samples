import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as allActions from './param.actions';
import { ParamService } from '../../services/param.service';
import { EMPTY, catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ParamGroupState } from './param.reducer';
import { select_Page, select_Search_Record } from './param.selectors';
import { GlobalService } from 'src/app/core/services/global.service';

@Injectable()
export class ParamEffects {
  List$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.load_records),
      withLatestFrom(
        this.store.select(select_Search_Record),
        this.store.select(select_Page)
      ),
      switchMap(([action, search_record, page]) => this.service.getList(action, search_record, page).pipe(
        map(result => this.store.dispatch(allActions.load_success({ records: result.records, page: result.page, param_type: action.param_type }))),
      )),
      catchError(error => {
        const err = !!error.error ? error.error : error;
        this.gs.showScreen([err]);
        throw EMPTY;
      })
    );
  }, { dispatch: false });

  Delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.delete_record),
      switchMap((action: any) => this.service.delete(action.id).pipe(
        map(result => {
          if (result.status)
            this.store.dispatch(allActions.delete_complete({ id: result.id, param_type: action.param_type }));
          else {
            throw new Error(result.message);
          }
        })
      )),
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
    private store: Store<ParamGroupState>,
    private gs: GlobalService
  ) {
  }
}

