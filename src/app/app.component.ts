import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { iUser } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';


  count$ = of(NaN);
  /**
   *
   */
  constructor(router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let user = JSON.parse(localStorage.getItem('token') || '{}');
      console.log(user.user_id);
    }
  }



}
