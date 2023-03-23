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
import { coreReducers } from './store/index';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [
    MenuComponent,
    HomeComponent,
    ContactusComponent,
    AboutusComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature('core', coreReducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    MenuComponent,
    RouterModule
  ]
})
export class CoreModule { }
