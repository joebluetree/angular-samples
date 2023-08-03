import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { iModulem } from '../../../../user-admin/models/imodulem';
import { CommonService } from 'src/app/shared/services/common.service';
import { GlobalService } from 'src/app/core/services/global.service';


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


  showDiv = true;

  isDisabled = false;
  ctrl = new FormControl('');

  onChange: any = () => { };
  onTouch: any = () => { };

  records: Array<iModulem> = [];

  constructor(private service: CommonService, private gs: GlobalService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let search_record = {
      'table': 'modulem',
      'company_id': this.gs.user.user_company_id
    }
    this.service.getList(search_record).subscribe({
      next: (v) => {
        console.log(v.records);
        this.records = <iModulem[]>v.records;
      },
      error: (e) => {
        this.gs.showScreen([e.error || e.message]);
      },
      complete: () => { }
    })
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
