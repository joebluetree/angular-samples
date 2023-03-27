import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { coreReducers, CORE_FEATURE_NAME } from './store/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from './http.interceptor';
import { ProgressScreenComponent } from './progress-screen/progress-screen.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'module', loadChildren: () => import('../user-admin/user-admin.module').then(m => m.UserAdminModule) },
]

@NgModule({
  declarations: [
    MenuComponent,
    HomeComponent,
    ContactusComponent,
    AboutusComponent,
    LoginComponent,
    ProgressScreenComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(CORE_FEATURE_NAME, coreReducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    MenuComponent,
    ProgressScreenComponent,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }
  ]
})
export class CoreModule { }
