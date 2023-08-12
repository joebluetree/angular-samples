import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iModulem_Search } from '../../models/imodulem';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-module-search',
  templateUrl: './module-search.component.html',
  styleUrls: ['./module-search.component.css']
})
export class ModuleSearchComponent {

  mform: FormGroup;
  record!: iModulem_Search;

  @Input() set input(v: iModulem_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iModulem_Search>();

  dataList = [{ key: 'NA', value: 'ALL' }, { key: 'Y', value: 'YES' }, { key: 'N', value: 'NO' }]

  constructor(private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }

  buildForm() {
    this.mform = this.fb.group({
      module_name: [''],
      module_is_installed: [''],
    })

  }

  ngOnInit(): void {
    this.mform.setValue({
      module_name: this.record.module_name,
      module_is_installed: this.record.module_is_installed,
    })
  }

  search(_action: string) {
    if (this.output) {
      this.record.module_name = this.mform.value.module_name;
      this.record.module_is_installed = this.mform.value.module_is_installed;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
