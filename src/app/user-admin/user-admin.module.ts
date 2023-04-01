import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';
import { StoreModule } from '@ngrx/store';
import { UserAdminFeatureName, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleEffects } from './store/module/module.effects';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSearchComponent } from './module/module-search/module-search.component';

const routes: Routes = [
  { path: 'moduleList', component: ModuleListComponent },
  { path: 'moduleEdit', component: ModuleEditComponent }
]

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleEditComponent,
    ModuleSearchComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(UserAdminFeatureName, reducers),
    EffectsModule.forFeature([ModuleEffects])
  ]
})
export class UserAdminModule { }
