import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';


  count$ = of(NaN);
  /**
   *
   */
  constructor(router: Router) {

  }

}
