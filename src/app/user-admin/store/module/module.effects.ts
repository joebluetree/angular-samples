import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { module_load_records, module_load_success, module_delete, module_delete_complete } from './module.actions';
import { ModuleService } from '../../services/module.service';
import { EMPTY, catchError, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleState } from './module.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { selectModulePage, selectModuleSearch_Record } from './module.selectors';


@Injectable()
export class ModuleEffects {
  moduleList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(module_load_records),
      withLatestFrom(
        this.store.select(selectModuleSearch_Record),
        this.store.select(selectModulePage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(module_load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  moduleDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(module_delete),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(module_delete_complete({ id: result.id }));
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

