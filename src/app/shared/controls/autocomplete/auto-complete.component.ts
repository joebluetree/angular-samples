import { Component, ElementRef, Input, Output, QueryList, ViewChild, ViewChildren, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { icolumns } from '../../models/icolumns';

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true
    }
  ]
})
export class AutoCompleteComponent implements ControlValueAccessor {

  @Input('required') required: any;
  @Input('formControlName') ctrl_name: any;
  @Input('validation') _validations: boolean = true;
  @Input('company_id') company_id: number = 0;
  @Input('branch_id') branch_id: number = 0;
  @Input('table') table: string = '';
  @Input('display_column') display_column: string = '';

  @Output() CallBack = new EventEmitter<{ id: string, rec: any }>();

  @ViewChild('inputBox') inputBox: ElementRef;
  @ViewChildren('radio') inputs: QueryList<ElementRef>;

  id: string;

  showDiv = false;
  isDisabled = false;
  ctrl = new FormControl('');

  onChange: any = () => { };
  onTouch: any = () => { };

  records: Array<any> = [];


  isChanged = false;

  rowid = 0;

  columns: icolumns[];

  constructor(private service: CommonService, private gs: GlobalService) {

  }

  ngOnInit(): void {
    this.id = this.ctrl_name;
    this.columns = this.service.getColumns(this.table);
    this.setup();
  }

  ngAfterViewInit(): void {
    if (this._validations)
      this.addValidators();
  }


  addValidators() {
    let bOk = false;
    if (this.required == '') {
      this.ctrl.addValidators([Validators.required]);
      bOk = true;
    }
    if (bOk)
      this.ctrl.updateValueAndValidity();
  }

  private searchRecord() {
    let data = this.getValue();
    let search_record = {
      'table': this.table,
      'company_id': this.company_id,
      'search_string': data
    };
    this.service.getList(search_record).subscribe({
      next: (v) => {
        this.records = v.records;
        if (this.records.length > 0) {
          this.showDiv = true;
          this.selectTableRow(0);
        }
        this.isChanged = false;
      },
      error: (e) => {
        this.gs.showScreen([e.error || e.message]);
      }
    })
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
    let data = this.getValue();
    if (data == '') {
      this.ResetValue();
      return;
    }
    if (this.isChanged)
      this.searchRecord();
  }

  onClickSearch() {
    this.searchRecord();
  }

  radioKeyDown(event: KeyboardEvent, rec: any) {
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

  onSelection(rec: any) {
    const value = rec[this.display_column];

    this.writeValue(value);
    this.onChange(value);
    this.onTouch();

    this.isChanged = false;
    this.showDiv = false;
    this.selectInputBox();
    this.CallBack.emit({ id: this.id, rec: rec });
  }

  ResetValue() {
    let data = this.getValue();
    if (data == '') {
      this.CallBack.emit({ id: this.id, rec: null });
    }
  }

  getValue() {
    return this.ctrl.value?.toString().trim() || '';
  }

  cancelSelection() {
    this.isChanged = false;
    this.showDiv = false;
    this.selectInputBox();
  }

  private setup() {
    /*
  this.term$.pipe(
    switchMap(value => {
      let search_record = {
        'table': this.table,
        'company_id': this.company_id,
        'search_string': value
      }
      return this.service.getList(search_record);
    }),
    catchError(error => {
      throw error;
    })
  ).subscribe({
    next: (v) => {
      this.records = v.records;
      if (this.records.length > 0) {
        this.showDiv = true;
        this.selectTableRow(0);
      }
      this.isChanged = false;
    },
    error: (e) => {
      //this.gs.showScreen([e.error || e.message]);
      this.gs.showScreen(['error']);
    }
  })
  */
  }
}
