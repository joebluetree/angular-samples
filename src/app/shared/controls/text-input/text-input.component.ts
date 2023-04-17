import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() case: string = 'upper';

  isDisabled = false;
  data!: string;

  onChange: any = (value: string) => {
  };

  onTouch: any = () => {

  };

  onBlur: any = () => {
    this.data = this.data.toString().trim();

    if (this.case.toString().toLowerCase() == 'upper') {
      this.data = this.data.toString().toUpperCase();
    }
    if (this.case.toString().toLowerCase() == 'lower') {
      this.data = this.data.toString().toLowerCase();
    }
    this.onTouch();
  }

  writeValue(obj: string): void {
    this.data = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
