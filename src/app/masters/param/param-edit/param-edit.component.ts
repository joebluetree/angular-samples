import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iParam } from '../../models/iparam';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import { param_upsert_row } from '../../store/param/param.actions';
import { ParamService } from '../../services/param.service';

@Component({
  selector: 'app-param-edit',
  templateUrl: './param-edit.component.html',
  styleUrls: ['./param-edit.component.css']
})
export class ParamEditComponent {
  id = 0;
  menuid = '';
  title = '';
  type = '';

  mform: FormGroup;
  constructor(
    private gs: GlobalService,
    private service: ParamService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {
    this.mform = this.fb.group({
      param_id: [0],
      param_code: ['', [Validators.required, Validators.maxLength(60)]],
      param_name: ['', [Validators.required, Validators.maxLength(60)]],
      param_order: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  ngOnInit() {
    this.id = 0;
    this.route.queryParams.forEach(rec => {
      this.id = +rec["id"];
      this.menuid = rec["menuid"];
      this.title = rec["title"];
      this.type = rec["type"];
    })

    console.log(this.title);
    this.getRecord();
  }

  getRecord() {
    if (this.id <= 0)
      return;
    this.service.getRecord(this.id).subscribe({
      next: (rec) => {
        this.mform.setValue({
          param_id: rec.param_id,
          param_code: rec.param_code,
          param_name: rec.param_name,
          param_order: rec.param_order
        })
      },
      error: (e) => {
        console.log(e);
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
    const data = <iParam>this.mform.value;
    data.param_type = this.type;

    if (data.param_id == null)
      data.param_id = 0;

    this.service.save(this.id, data).subscribe({
      next: (v: iParam) => {
        if (data.param_id == 0) {
          this.id = v.param_id;
          data.param_id = this.id;
          this.mform.patchValue({ param_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(param_upsert_row({ record: v }));

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
