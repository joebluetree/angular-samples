import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iSettings_Search } from '../../models/isettings';
import { GlobalService } from 'src/app/core/services/global.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-search',
  templateUrl: './settings-search.component.html',
  styleUrls: ['./settings-search.component.css']
})
export class SettingsSearchComponent {

  mform: FormGroup;
  record!: iSettings_Search;

  @Input() set input(v: iSettings_Search) {
    this.record = { ...v };
  }

  @Output() output = new EventEmitter<iSettings_Search>();

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService) {
    this.buildForm();
  }


  buildForm() {
    this.mform = this.fb.group({
      caption: [''],
    })
  }

  ngOnInit(): void {
    this.mform.setValue({
      caption: this.record.caption,
    })
  }


  search(_action: string) {
    if (this.output) {
      this.record.caption = this.mform.value.caption;
      this.record.rec_company_id = this.gs.user.user_company_id;
      this.output.emit(this.record);
    }
  }

}
