import { Component, Input, forwardRef, isDevMode } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true
    }
  ]
})
export class ComboboxComponent implements ControlValueAccessor {
  ctrl = new FormControl();

  @Input('formControlName') ctrl_name: any;
  @Input('dataSource') dataSource: any;
  @Input('displayColumn') displayColumn: any;
  @Input('valueColumn') valueColumn: any;

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
    const value = e.target.value;
    this.writeValue(value);
    this.onChange(value);
    this.onTouch();
  }

}
