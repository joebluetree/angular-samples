import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private gs: GlobalService,
    private http: HttpClient) {
  }

  login(login: any) {
    console.log('login calling backend');
    const params = new HttpParams()
      .set("username", login.code)
    const options = {
      params: params
    }
    return this.http.get(this.gs.getUrl('/users'), options).pipe(
      map((user: any) => user[0])
    );
  }

}
