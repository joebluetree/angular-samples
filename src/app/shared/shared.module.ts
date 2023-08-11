import { AutoCompleteComponent } from './controls/autocomplete/auto-complete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';

import { SortPipe } from './pipe/sort.pipe';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';

import { LetModule } from '@ngrx/component';
import { InputComponent } from './controls/input/Input.component';
import { TableComponent } from './controls/table/table.component';
import { RouterLink, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PageComponent,
    InputComponent,
    TableComponent,
    SortPipe,
    CheckboxComponent,
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LetModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PageComponent,
    InputComponent,
    TableComponent,
    SortPipe,
    CheckboxComponent,
    AutoCompleteComponent,
    LetModule,
  ]
})
export class SharedModule { }
