import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-progress-screen',
  templateUrl: './progress-screen.component.html',
  styleUrls: ['./progress-screen.component.css']
})
export class ProgressScreenComponent {

  progressScreen$: Observable<Boolean> = this.loginService.loadScreen$;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

}
