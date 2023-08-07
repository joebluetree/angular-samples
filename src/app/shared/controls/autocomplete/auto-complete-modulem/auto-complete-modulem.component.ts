import { Component, ElementRef, Input, Output, QueryList, ViewChild, ViewChildren, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { iModulem } from '../../../../user-admin/models/imodulem';
import { CommonService } from 'src/app/shared/services/common.service';
import { GlobalService } from 'src/app/core/services/global.service';

import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  @Input('id') id: string = 'module_id';

  @Output() CallBack = new EventEmitter<{ id: string, rec: iModulem }>();

  @ViewChild('inputBox') inputBox: ElementRef;
  @ViewChildren('radio') inputs: QueryList<ElementRef>;

  showDiv = false;
  isDisabled = false;
  ctrl = new FormControl('');

  onChange: any = () => { };
  onTouch: any = () => { };

  records: Array<iModulem> = [];
  term$ = new Subject<string>();

  isChanged = false;

  rowid = 0;

  constructor(private service: CommonService, private gs: GlobalService) {
  }

  ngOnInit(): void {
    this.setup();
  }

  private setup() {
    this.term$
      .pipe(
        switchMap(value => {
          let search_record = {
            'table': 'modulem',
            'company_id': this.gs.user.user_company_id,
            'module_name': value
          }
          return this.service.getList(search_record);
        }),
      ).subscribe({
        next: (v) => {
          this.records = <iModulem[]>v.records;
          if (this.records.length > 0) {
            this.showDiv = true;
            this.selectTableRow(0);
          }
          this.isChanged = false;
        },
        error: (e) => {
          this.gs.showScreen([e.error || e.message]);
        },
        complete: () => { }
      })
  }

  private searchRecord() {
    let data = this.ctrl.value?.toString().trim() || '';
    this.term$.next(data);
  }

  selectTableRow(index: number = 0) {
    setTimeout(() => {
      if (this.inputs.toArray()[index])
        this.inputs.toArray()[index].nativeElement.focus();
    }, 0);
  }

  selectInputBox() {
    setTimeout(() => {
      this.inputBox.nativeElement.focus();
    }, 0);

  }

  ngOnDestroy(): void {
    this.term$.unsubscribe();
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

  public InputBox_OnFocus: any = () => {
    this.isChanged = false;
    this.showDiv = false;
  }

  public InputBox_OnKeyDown(event: KeyboardEvent) {

    if (event.key == "Tab" || event.key == "Escape")
      return;
    if (event.key == "ArrowDown" || event.key == "Enter") {
      this.searchRecord();
    }
    else
      this.isChanged = true;
  }

  public InputBox_OnBlur: any = () => {
    if (this.isChanged) {
      this.searchRecord();
    }
  }

  radioKeyDown(event: KeyboardEvent, rec: iModulem) {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
    if (event.key === 'Enter') {
      this.onSelection(rec);
    }
    if (event.key === 'Escape') {
      this.cancelSelection();
    }
    if (event.key === 'PageUp') {
    }
    if (event.key === 'PageDown') {
    }
  }

  onSelection(rec: iModulem) {
    this.ctrl.setValue(rec.module_name);
    this.isChanged = false;
    this.showDiv = false;
    this.selectInputBox();
    this.CallBack.emit({ id: this.id, rec: rec });
  }

  cancelSelection() {
    this.isChanged = false;
    this.showDiv = false;
    this.selectInputBox();
  }

}
