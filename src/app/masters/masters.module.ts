import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as paramReducer from './store/param/param.reducer';
import { ParamEffects } from './store/param/param.effects';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ParamListComponent } from './param/param-list/param-list.component';
import { ParamSearchComponent } from './param/param-search/param-search.component';
import { ParamEditComponent } from './param/param-edit/param-edit.component';

const routes: Routes = [
  { path: 'paramList', component: ParamListComponent },
  { path: 'paramEdit', component: ParamEditComponent }
]

@NgModule({
  declarations: [
    ParamListComponent,
    ParamSearchComponent,
    ParamEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(paramReducer.FeatureName, paramReducer.Reducer),
    EffectsModule.forFeature([ParamEffects])
  ]
})
export class MastersModule { }
