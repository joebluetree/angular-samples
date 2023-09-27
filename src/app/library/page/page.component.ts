import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iPage } from '../models/ipage';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  @Input('page') page!: iPage;
  @Output() pageEvents: EventEmitter<{ action: string }> = new EventEmitter();

  constructor() {
  }

  list(_action: string) {
    if (this.pageEvents) {
      this.pageEvents.emit({ action: _action })
    }
  }

}
