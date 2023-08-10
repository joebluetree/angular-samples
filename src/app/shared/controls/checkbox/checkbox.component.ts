import { Component, Input, forwardRef, isDevMode } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  chkbox = new FormControl();

  @Input('formControlName') ctrl_name: any;

  id: string = '_id'

  isDisabled = false;

  onChange: any = (value: string) => { };
  onTouch: any = () => { };

  constructor() {
  }

  ngAfterViewInit(): void {
    this.id = this.ctrl_name;
  }



  writeValue(obj: any): void {
    const _type = typeof (obj);
    if (_type == 'string') {
      if (obj == "Y")
        this.chkbox.setValue(true);
      if (obj == "N")
        this.chkbox.setValue(false);
    }
    else
      this.chkbox.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   if (isDisabled)
  //     this.chkbox.disable()
  //   else
  //     this.chkbox.enable();
  // }

  changeStatus(e: any) {
    const isChecked = e.target.checked;
    this.onChange(isChecked ? "Y" : "N");
  }

}
