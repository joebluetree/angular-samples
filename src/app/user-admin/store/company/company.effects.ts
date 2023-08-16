import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as  company_actions from './company.actions';
import { CompanyService } from '../../services/company.service';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { CompanyState } from './company.reducer';
import { GlobalService } from 'src/app/core/services/global.service';
import { selectCompanyPage, selectCompanySearch_Record } from './company.selectors';

@Injectable()
export class CompanyEffects {
  companyList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(company_actions.company_load_records),
      withLatestFrom(
        this.store.select(selectCompanySearch_Record),
        this.store.select(selectCompanyPage)
      ),
      switchMap(([action, search_record, page]) => {
        const data: any = this.service.getList(action.action, search_record, page);
        return data;
      }),
      tap((result: any) => {
        return this.store.dispatch(company_actions.company_load_success({ records: result.records, page: result.page }));
      })
    );
  }, { dispatch: false });

  companyDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(company_actions.company_delete),
      switchMap((action: any) => this.service.delete(action.id)),
      tap((result: any) => {
        if (result.status)
          this.store.dispatch(company_actions.company_delete_complete({ id: result.id }));
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
    private service: CompanyService,
    private store: Store<CompanyState>,
    private gs: GlobalService
  ) {
  }
}
