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


@NgModule({
  declarations: [
    PageComponent,
    InputComponent,
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PageComponent,
    InputComponent,
    SortPipe,
    CheckboxComponent,
    AutoCompleteComponent,
    LetModule,
  ]
})
export class SharedModule { }
