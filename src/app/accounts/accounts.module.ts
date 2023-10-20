import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as accGroupReducer from './store/accgroup/accgroup.reducer';
import * as accGroupEffects from './store/accgroup/accgroup.effects';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AccGroupSearchComponent } from './accgroup/accgroup-search/accgroup-search.component';
import { AccGroupListComponent } from './accgroup/accgroup-list/accgroup-list.component';
import { AccGroupEditComponent } from './accgroup/accgroup-edit/accgroup-edit.component';

const routes: Routes = [
  { path: 'accgroupList', component: AccGroupListComponent },
  { path: 'accgroupEdit', component: AccGroupEditComponent }
]

@NgModule({
  declarations: [
    AccGroupSearchComponent,
    AccGroupListComponent,
    AccGroupEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(accGroupReducer.FeatureName, accGroupReducer.Reducer),
    EffectsModule.forFeature([accGroupEffects.AccGroupEffects])
  ]
})
export class AccountsModule { }
