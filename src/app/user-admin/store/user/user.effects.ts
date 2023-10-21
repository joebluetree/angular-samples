import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as  allActions from './user.actions';
import { UserService } from '../../services/user.service';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from './user.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { select_Page, select_Search_Record } from './user.selectors';

@Injectable()
export class UserEffects {
  List$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.load_records),
      withLatestFrom(
        this.store.select(select_Search_Record),
        this.store.select(select_Page)
      ),
      switchMap(([action, search_record, page]) => {
        const _search_record = { ...search_record, ...this.gs.getGlobalConstants() };
        const data: any = this.service.getList(action.action, _search_record, page);
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
    private service: UserService,
    private store: Store<UserState>,
    private gs: GlobalService
  ) {
  }
}

