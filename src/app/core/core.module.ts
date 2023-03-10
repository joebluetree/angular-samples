import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
]

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MenuComponent,
    RouterModule
  ]

})
export class CoreModule { }
