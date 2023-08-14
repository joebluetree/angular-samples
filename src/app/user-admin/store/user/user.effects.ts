import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as  user_actions from './user.actions';
import { UserService } from '../../services/user.service';
import { EMPTY, catchError, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from './user.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { selectUserPage, selectUserSearch_Record } from './user.selectors';

@Injectable()
export class UserEffects {
  userList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(user_actions.user_load_records),
      withLatestFrom(
        this.store.select(selectUserSearch_Record),
        this.store.select(selectUserPage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(user_actions.user_load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  userDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(user_actions.user_delete),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(user_actions.user_delete_complete({ id: result.id }));
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

