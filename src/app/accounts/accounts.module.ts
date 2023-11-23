import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as accGroupReducer from './store/accgroup/accgroup.reducer';
import { AccGroupEffects } from './store/accgroup/accgroup.effects';

import * as acctmReducer from './store/acctm/acctm.reducer';
import { AcctmEffects } from './store/acctm/acctm.effects';

import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AccGroupSearchComponent } from './accgroup/accgroup-search/accgroup-search.component';
import { AccGroupListComponent } from './accgroup/accgroup-list/accgroup-list.component';
import { AccGroupEditComponent } from './accgroup/accgroup-edit/accgroup-edit.component';
import { AcctmSearchComponent } from './acctm/acctm-search/acctm-search.component';
import { AcctmListComponent } from './acctm/acctm-list/acctm-list.component';
import { AcctmEditComponent } from './acctm/acctm-edit/acctm-edit.component';

const routes: Routes = [
  { path: 'accgroupList', component: AccGroupListComponent },
  { path: 'accgroupEdit', component: AccGroupEditComponent },
  { path: 'acctmList', component: AcctmListComponent },
  { path: 'acctmEdit', component: AcctmEditComponent }
]

@NgModule({
  declarations: [
    AccGroupSearchComponent,
    AccGroupListComponent,
    AccGroupEditComponent,
    AcctmSearchComponent,
    AcctmListComponent,
    AcctmEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(accGroupReducer.FeatureName, accGroupReducer.Reducer),
    StoreModule.forFeature(acctmReducer.FeatureName, acctmReducer.Reducer),
    EffectsModule.forFeature([AccGroupEffects, AcctmEffects])
  ]
})
export class AccountsModule { }
