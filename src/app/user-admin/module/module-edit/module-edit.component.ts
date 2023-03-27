import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent {

  constructor(private location: Location) {
  }


  return2Parent() {
    this.location.back();
  }

}
