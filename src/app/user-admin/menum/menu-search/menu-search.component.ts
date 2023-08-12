import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iMenum_Search } from '../../models/imenum';
import { GlobalService } from 'src/app/core/services/global.service';
import { iModulem } from '../../models/imodulem';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.css']
})
export class MenuSearchComponent {

  mform: FormGroup;
  record!: iMenum_Search;

  @Input() set input(v: iMenum_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iMenum_Search>();


  dataList = [{ key: 'NA', value: 'ALL' }, { key: 'Y', value: 'YES' }, { key: 'N', value: 'NO' }]

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      menu_name: [''],
      module_id: [0],
      module_name: [''],
      menu_visible: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      menu_name: this.record.menu_name,
      module_id: this.record.module_id,
      module_name: this.record.module_name,
      menu_visible: this.record.menu_visible,
    })
  }


  getCompanyId() {
    return this.gs.user.user_company_id;
  }

  search(_action: string) {
    if (this.output) {
      this.record.menu_name = this.mform.value.menu_name;
      this.record.module_id = this.mform.value.module_id;
      this.record.module_name = this.mform.value.module_name;
      this.record.menu_visible = this.mform.value.menu_visible;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

  callBack(action: { id: string, rec: iModulem }) {
    if (action.id == 'module_name') {
      if (action.rec) {
        this.mform.patchValue({
          module_id: action.rec ? action.rec.module_id : 0,
          module_name: action.rec ? action.rec.module_name : '',
        })
      }
      else {
        this.mform.patchValue({
          module_id: 0,
          module_name: '',
        })
      }
    }
  }

}
