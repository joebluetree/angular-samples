import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map, switchMap, tap, withLatestFrom } from 'rxjs';

import * as  allActions from './settings.actions';
import { SettingsService } from '../../services/settings.service';
import { SettingsGroupState } from './settings.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { select_Page, select_Search_Record } from './settings.selectors';

@Injectable()
export class SettingsEffects {
  List$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.load_records),
      withLatestFrom(
        this.store.select(select_Search_Record),
        this.store.select(select_Page)
      ),
      switchMap(([action, search_record, page]) => this.service.getList(action, search_record, page).pipe(
        map(result => this.store.dispatch(allActions.load_success({ records: result.records, page: result.page, category: action.category }))),
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
            this.store.dispatch(allActions.delete_complete({ id: result.id, category: action.category }));
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
    private service: SettingsService,
    private store: Store<SettingsGroupState>,
    private gs: GlobalService
  ) {
  }

}
