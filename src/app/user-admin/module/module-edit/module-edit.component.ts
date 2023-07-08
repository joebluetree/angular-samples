import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';
import { iModulem } from '../../models/imodulem';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { module_upsert_row } from '../../store/module/module.actions';
import { ModuleState } from '../../store/module/module.reducer';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent {
  id = 0;
  mform: FormGroup;
  constructor(
    private gs: GlobalService,
    private service: ModuleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<ModuleState>
  ) {
    this.mform = this.fb.group({
      module_id: [0],
      module_name: ['', [Validators.required, Validators.maxLength(60)]],
      module_is_installed: ['Y'],
      module_order: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.route.queryParams.forEach(rec => {
      this.id = +rec["id"];
    })
    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0)
      return;
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        this.mform.setValue({
          module_id: rec.module_id,
          module_name: rec.module_name,
          module_is_installed: rec.module_is_installed,
          module_order: rec.module_order
        })
      },
      error: (e) => {
        alert(e.message);
      },
      complete: () => { }
    })
  }

  getControl(ctrlName: string) {
    return this.mform.controls[ctrlName];
  }

  save() {
    if (this.mform.invalid) {
      alert('Invalid Form')
      return;
    }
    const data = <iModulem>this.mform.value;

    if (data.module_id == null)
      data.module_id = 0;

    this.service.save(this.id, data).subscribe({
      next: (v: iModulem) => {
        if (data.module_id == 0) {
          this.id = v.module_id;
          data.module_id = this.id;
          this.mform.patchValue({ module_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(module_upsert_row({ record: v }));

        this.gs.showScreen(["Save Complete"]);

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
