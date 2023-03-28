import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';
import { iModulem } from '../../models/imodulem';


@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent {
  mform: FormGroup;
  constructor(
    private service: ModuleService,
    private fb: FormBuilder,
    private location: Location) {
    this.mform = this.fb.group({
      module_id: [null],
      module_name: ['', [Validators.required, Validators.maxLength(60)]],
      module_is_installed: ['Y'],
      module_order: ['', [Validators.required, Validators.minLength(1)]],
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

    this.service.save(data).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => { alert(e) },
      complete: () => { }

    })
  }

  return2Parent() {
    this.location.back();
  }

}
