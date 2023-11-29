import { Location } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { upsert_row } from '../../store/settings/settings.actions';
import { iMenum } from '../../models/imenum';
import { SettingsService } from '../../services/settings.service';
import { SettingsGroupState } from '../../store/settings/settings.reducer';
import { iSettings } from '../../models/isettings';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.css']
})
export class SettingsEditComponent {
  id = 0;

  title = '';

  @Input() appid: string = '';
  @Input() menuid: string = '';
  @Input() type: string = '';
  @Input() rec: any = {};


  inputType = 'text';

  format = "";

  //@Output() output = new EventEmitter<iSettings_Search>();


  bAdmin = false;
  bAdd = false;
  bEdit = false;
  bView = false;
  bDelete = false;

  menum: iMenum | null;

  showModel = true;


  code = '';
  name = '';
  value = '';

  mform: FormGroup;
  constructor(
    private gs: GlobalService,
    private service: SettingsService,
    private fb: FormBuilder,
    private location: Location,
    private store: Store<SettingsGroupState>
  ) {
    this.mform = this.fb.group({
      code: ['',],
      name: ['',],
      value: ['',],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.menum = this.gs.getUserRights(this.menuid);
    if (this.menum) {
      this.title = this.menum.menu_name;
      this.bAdmin = this.menum.rights_admin == "Y" ? true : false;
      this.bAdd = this.menum.rights_add == "Y" ? true : false;
      this.bEdit = this.menum.rights_edit == "Y" ? true : false;
      this.bView = this.menum.rights_view == "Y" ? true : false;
      this.bDelete = this.menum.rights_delete == "Y" ? true : false;
    }
    const mrec = JSON.parse(this.rec.value.replaceAll("'", '"'));
    if (this.rec.type == "INT" || this.rec.type == "NUMBER" || this.rec.type == "STRING") {
      this.format = 'input';
      if (this.rec.type == "INT" || this.rec.type == "NUMBER")
        this.inputType = 'number';
      if (this.rec.type == "STRING")
        this.inputType = 'text';
      this.value = mrec.value;
      this.mform.patchValue({
        value: this.value
      })
    }
  }


  getControl(ctrlName: string) {
    return this.mform.controls[ctrlName];
  }

  save() {

    let data = <iSettings>{ ...this.rec };

    if (this.format == 'input') {
      const _value = { 'value': this.mform.value.value }
      data.value = JSON.stringify(_value);
    }

    //data.rec_company_id = this.gs.user.user_company_id;
    data.rec_edited_by = this.gs.user.user_code;

    this.service.save(data.id, data).subscribe({
      next: (v) => {
        this.store.dispatch(upsert_row({ record: data, category: data.category }));
      },
      error: (e) => {
        this.gs.showScreen([e.error]);
      },
      complete: () => { }

    })
  }

  return2Parent() {
    this.location.back();
  }

}
