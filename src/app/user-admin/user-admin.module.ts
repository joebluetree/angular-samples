import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleEffects } from './store/module/module.effects';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSearchComponent } from './module/module-search/module-search.component';
import { ModuleFeatureName, moduleReducer } from './store/module/module.reducer';
import { MenuSearchComponent } from './menum/menu-search/menu-search.component';
import { MenuEditComponent } from './menum/menu-edit/menu-edit.component';
import { MenuListComponent } from './menum/menu-list/menu-list.component';
import { MenuFeatureName, menuReducer } from './store/menu/menu.reducer';
import { MenuEffects } from './store/menu/menu.effects';

const routes: Routes = [
  { path: 'moduleList', component: ModuleListComponent },
  { path: 'moduleEdit', component: ModuleEditComponent },
  { path: 'menuList', component: MenuListComponent },
  { path: 'menuEdit', component: MenuEditComponent }
]

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleEditComponent,
    ModuleSearchComponent,
    MenuSearchComponent,
    MenuEditComponent,
    MenuListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(ModuleFeatureName, moduleReducer),
    StoreModule.forFeature(MenuFeatureName, menuReducer),
    EffectsModule.forFeature([ModuleEffects, MenuEffects]),
  ]
})
export class UserAdminModule { }
