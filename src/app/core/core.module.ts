import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_NAME, authReducer } from './store/auth.store';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
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
    StoreModule.forFeature(AUTH_FEATURE_NAME, authReducer)
  ],
  exports: [
    MenuComponent,
    RouterModule
  ]
})
export class CoreModule { }
