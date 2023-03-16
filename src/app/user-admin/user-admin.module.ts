import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';


@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleEditComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class UserAdminModule { }
