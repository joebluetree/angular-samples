import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as paramReducer from './store/param/param.reducer';
import { ParamEffects } from './store/param/param.effects';

import * as customermReducer from './store/customer/customer.reducer';
import { CustomermEffects } from './store/customer/customer.effects';

import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ParamListComponent } from './param/param-list/param-list.component';
import { ParamSearchComponent } from './param/param-search/param-search.component';
import { ParamEditComponent } from './param/param-edit/param-edit.component';

import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';

const routes: Routes = [
  { path: 'paramList', component: ParamListComponent },
  { path: 'paramEdit', component: ParamEditComponent },
  { path: 'customerList', component: CustomerListComponent },
  { path: 'customerEdit', component: CustomerEditComponent }
]

@NgModule({
  declarations: [
    ParamListComponent,
    ParamSearchComponent,
    ParamEditComponent,
    CustomerListComponent,
    CustomerSearchComponent,
    CustomerEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(paramReducer.FeatureName, paramReducer.Reducer),
    StoreModule.forFeature(customermReducer.FeatureName, customermReducer.Reducer),
    EffectsModule.forFeature([ParamEffects, CustomermEffects])
  ]
})
export class MastersModule { }
