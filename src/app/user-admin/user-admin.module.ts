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
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanySearchComponent } from './company/company-search/company-search.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyEffects } from './store/company/company.effects';
import { CompanyFeatureName, companyReducer } from './store/company/company.reducer';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchEditComponent } from './branch/branch-edit/branch-edit.component';
import { BranchSearchComponent } from './branch/branch-search/branch-search.component';
import { BranchEffects } from './store/branch/branch.effects';
import { BranchFeatureName, branchReducer } from './store/branch/branch.reducer';

const routes: Routes = [
  { path: 'moduleList', component: ModuleListComponent },
  { path: 'moduleEdit', component: ModuleEditComponent },
  { path: 'menuList', component: MenuListComponent },
  { path: 'menuEdit', component: MenuEditComponent },
  { path: 'companyList', component: CompanyListComponent },
  { path: 'companyEdit', component: CompanyEditComponent },
  { path: 'branchList', component: BranchListComponent },
  { path: 'branchEdit', component: BranchEditComponent },

]

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleEditComponent,
    ModuleSearchComponent,
    MenuSearchComponent,
    MenuEditComponent,
    MenuListComponent,
    CompanyListComponent,
    CompanySearchComponent,
    CompanyEditComponent,
    BranchListComponent,
    BranchEditComponent,
    BranchSearchComponent,

  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CompanyFeatureName, companyReducer),
    StoreModule.forFeature(BranchFeatureName, branchReducer),
    StoreModule.forFeature(ModuleFeatureName, moduleReducer),
    StoreModule.forFeature(MenuFeatureName, menuReducer),
    EffectsModule.forFeature([CompanyEffects, BranchEffects, ModuleEffects, MenuEffects]),
  ]
})
export class UserAdminModule { }
