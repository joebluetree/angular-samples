import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';
import { StoreModule } from '@ngrx/store';
import { moduleFeatureName, userAdminReducers } from './store';


@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleEditComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(moduleFeatureName, userAdminReducers)
  ]
})
export class UserAdminModule { }
