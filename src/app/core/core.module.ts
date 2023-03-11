import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { AUTH_FEATURE_NAME, authReducer } from './store/auth.store';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
]

@NgModule({
  declarations: [
    MenuComponent,
    HomeComponent,
    ContactusComponent,
    AboutusComponent
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
