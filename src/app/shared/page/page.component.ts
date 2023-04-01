import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  @Output() pageEvents: EventEmitter<{ action: string }> = new EventEmitter();

  constructor() {
  }

  list(_action: string) {
    if (this.pageEvents)
      this.pageEvents.emit({ action: _action })
  }

}
