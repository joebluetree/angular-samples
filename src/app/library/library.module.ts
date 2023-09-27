import { AutoCompleteComponent } from './controls/autocomplete/auto-complete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';

import { SortPipe } from './pipe/sort.pipe';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';

import { LetModule, PushModule } from '@ngrx/component';

import { InputComponent } from './controls/input/Input.component';
import { TableComponent } from './controls/table/table.component';
import { RouterModule } from '@angular/router';
import { ComboboxComponent } from './controls/combobox/combobox.component';


@NgModule({
  declarations: [
    PageComponent,
    InputComponent,
    TableComponent,
    SortPipe,
    CheckboxComponent,
    AutoCompleteComponent,
    ComboboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LetModule,
    PushModule,
    RouterModule,
  ],
  exports: [
    PageComponent,
    InputComponent,
    TableComponent,
    SortPipe,
    CheckboxComponent,
    AutoCompleteComponent,
    ComboboxComponent,
  ]
})
export class LibraryModule { }
