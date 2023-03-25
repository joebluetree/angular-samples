import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { module_load_records, module_load_success } from './module.actions';
import { ModuleService } from '../../services/module.service';
import { switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { iModulem } from '../../models/imodulem';

@Injectable()
export class ModuleEffects {

  mouelList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(module_load_records),
      switchMap(() => this.service.getList()),
      tap((result: iModulem[]) => this.store.dispatch(module_load_success({ records: result })))
    )
  }, { dispatch: false });


  constructor(
    private actions$: Actions,
    private service: ModuleService,
    private store: Store
  ) {
  }
}

