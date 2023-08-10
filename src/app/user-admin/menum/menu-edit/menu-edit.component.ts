import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';
import { Store } from '@ngrx/store';
import * as allActions from '../../store/menu/menu.actions';

import { iMenum } from '../../models/imenum';
import { MenuState } from '../../store/menu/menu.reducer';
import { MenueService } from '../../services/menu.service';
import { iModulem } from '../../models/imodulem';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent {
  id = 0;
  mform: FormGroup;
  showModel = true;
  constructor(
    private gs: GlobalService,
    private service: MenueService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<MenuState>
  ) {
    this.mform = this.fb.group({
      menu_id: [0],
      menu_code: ['', [Validators.required, Validators.maxLength(20)]],
      menu_name: ['', [Validators.required, Validators.maxLength(60)]],
      menu_route: ['', [Validators.required, Validators.maxLength(60)]],
      menu_param: ['', [Validators.maxLength(100)]],
      menu_visible: ['Y'],
      menu_module_id: [0, [Validators.required]],
      menu_module_name: ['', [Validators.required, Validators.maxLength(60)]],
      menu_order: ['', [Validators.required]],
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
          menu_id: rec.menu_id,
          menu_code: rec.menu_code,
          menu_name: rec.menu_name,
          menu_route: rec.menu_route,
          menu_param: rec.menu_param,
          menu_module_id: rec.menu_module_id,
          menu_module_name: rec.menu_module_name,
          menu_visible: rec.menu_visible,
          menu_order: rec.menu_order
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
    const data = <iMenum>this.mform.value;

    if (data.menu_id == null)
      data.menu_id = 0;

    data.rec_company_id = this.gs.user.user_company_id;
    data.rec_created_by = this.gs.user.user_code;

    this.service.save(this.id, data).subscribe({
      next: (v: iMenum) => {
        if (data.menu_id == 0) {
          this.id = v.menu_id;
          data.menu_id = this.id;
          this.mform.patchValue({ menu_id: this.id });
          const param = {
            id: this.id.toString()
          };
          this.gs.updateURL(param);
        };
        this.store.dispatch(allActions.menu_upsert_row({ record: v }));

        this.gs.showScreen(["Save Complete"]);

      },
      error: (e) => {
        this.gs.showScreen([e.error || e.message]);
      },
      complete: () => { }

    })
  }

  callBack(action: { id: string, rec: iModulem }) {

    if (action.id == 'menu_module_id') {

      this.mform.patchValue({
        menu_module_id: action.rec ? action.rec.module_id : 0,
        menu_module_name: action.rec ? action.rec.module_name : '',
      })

    }
  }

  getCompanyId() {
    return this.gs.user.user_company_id;
  }


  return2Parent() {
    this.location.back();
  }

}
