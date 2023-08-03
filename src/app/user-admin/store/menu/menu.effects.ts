import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as allActions from './menu.actions';
import { EMPTY, catchError, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { MenuState } from './menu.reducer';
import { menuPage, menuSearch_Record } from './menu.selectors';
import { GlobalService } from 'src/app/core/services/global.service';
import { MenueService } from '../../services/menu.service';


@Injectable()
export class MenuEffects {
  moduleList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.menu_load_records),
      withLatestFrom(
        this.store.select(menuSearch_Record),
        this.store.select(menuPage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(allActions.menu_load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  moduleDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(allActions.menu_delete),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(allActions.menu_delete_complete({ id: result.id }));
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
    private service: MenueService,
    private store: Store<MenuState>,
    private gs: GlobalService
  ) {
  }
}

