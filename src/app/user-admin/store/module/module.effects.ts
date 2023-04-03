import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { module_load_records, module_load_success, module_update_search } from './module.actions';
import { ModuleService } from '../../services/module.service';
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { iModulem, iModulem_Search } from '../../models/imodulem';
import { ModuleState } from './module.reducer';
import { modulePage, moduleSearch_Record } from './module.selectors';


@Injectable()
export class ModuleEffects {

  mouelList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(module_load_records),
      withLatestFrom(
        this.store.select(moduleSearch_Record),
        this.store.select(modulePage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        console.log(data);
        return data;
      }),
      tap((result: any) => {
        console.log('Module List', result);
        return this.store.dispatch(module_load_success({ records: result.records, page: result.page }));
      })
    )
  }, { dispatch: false });


  constructor(
    private actions$: Actions,
    private service: ModuleService,
    private store: Store<ModuleState>
  ) {
  }
}

