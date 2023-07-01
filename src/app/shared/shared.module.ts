import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { SortPipe } from './pipe/sort.pipe';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';

import { LetModule } from '@ngrx/component';

@NgModule({
  declarations: [
    PageComponent,
    TextInputComponent,
    SortPipe,
    CheckboxComponent
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
    TextInputComponent,
    SortPipe,
    CheckboxComponent,
    LetModule,
  ]
})
export class SharedModule { }
