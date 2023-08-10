import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() case: string = '';
  @Input('formControlName') ctrl_name: any;
  @Input('type') ctrl_type: any = "text";
  @Input('required') required: any;
  @Input('maxlength') maxLength: any = 0;
  @Input('minlength') minLength: any = 0;

  @Input('validation') _validations: boolean = true;

  id: string = '_id_text';

  isDisabled = false;
  ctrl = new FormControl('');

  onChange: any = () => { };
  onTouch: any = () => { };

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.id = this.ctrl_name;
    if (this._validations)
      this.addValidators();
  }

  test() {
    console.log(this.ctrl);
  }

  addValidators() {
    let bOk = false;
    if (this.required == '') {
      this.ctrl.addValidators([Validators.required]);
      bOk = true;
    }
    if (this.minLength > 0) {
      this.ctrl.addValidators(Validators.minLength(this.minLength));
      bOk = true;
    }
    if (this.maxLength > 0) {
      this.ctrl.addValidators(Validators.maxLength(this.maxLength));
      bOk = true;
    }
    if (bOk)
      this.ctrl.updateValueAndValidity();
  }


  writeValue(obj: string): void {
    this.ctrl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  // setDisabledState(isDisabled: boolean): void {
  //   this.isDisabled = isDisabled;
  // }

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
