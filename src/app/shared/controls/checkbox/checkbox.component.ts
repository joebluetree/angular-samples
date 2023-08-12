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
  ctrl = new FormControl();

  @Input('formControlName') ctrl_name: any;

  id: string;

  isDisabled = false;

  onChange: any = (value: string) => { };
  onTouch: any = () => { };

  constructor() {

  }

  ngOnInit(): void {
    this.id = this.ctrl_name;
  }

  ngAfterViewInit(): void {

  }



  writeValue(obj: any): void {
    const _type = typeof (obj);
    if (_type == 'string') {
      if (obj == "Y")
        this.ctrl.setValue(true);
      if (obj == "N")
        this.ctrl.setValue(false);
    }
    else
      this.ctrl.setValue(obj);
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
    const value = e.target.checked ? "Y" : "N";
    this.writeValue(value);
    this.onChange(value);
    this.onTouch();
  }

}
