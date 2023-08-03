import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'auto-complete-modulem',
  templateUrl: './auto-complete-modulem.component.html',
  styleUrls: ['./auto-complete-modulem.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteModulemComponent),
      multi: true
    }
  ]
})
export class AutoCompleteModulemComponent implements ControlValueAccessor {
  @Input('id') id: string = '_id_text';
  @Input() case: string = 'upper';

  isDisabled = false;
  ctrl = new FormControl('');

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(obj: string): void {
    this.ctrl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onBlur: any = () => {
    let _data = this.ctrl.value?.toString().trim() || '';
    if (this.case.toString().toLowerCase() == 'upper') {
      _data = _data.toUpperCase();
    }
    if (this.case.toString().toLowerCase() == 'lower') {
      _data = _data.toLowerCase();
    }
    this.writeValue(_data);
    this.onChange(_data);
    this.onTouch();
  }

}
