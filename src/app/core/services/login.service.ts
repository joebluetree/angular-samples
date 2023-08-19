import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loadScreen: Subject<Boolean> = new Subject<Boolean>();
  public readonly loadScreen$ = this._loadScreen.asObservable();


  constructor(
    private gs: GlobalService,
    private http: HttpClient) {

  }

  login(login: any) {
    const params = new HttpParams()
      .set("code", login.code)
      .set("password", login.password)
    const options = {
      params: params
    }
    return this.http.get(this.gs.getUrl('api/Auth/Login'), options);
  }

  loadBranches(search_record: any) {
    const url = this.gs.getUrl('/api/Auth/GetBranchListAsync');
    return this.http.post<any>(url, search_record);
  }


  branchLogin(data: any) {

    return this.http.post(this.gs.getUrl('api/Auth/BranchLoginAsync'), data);
  }

  public showScreen() {
    this._loadScreen.next(true);
  }
  public hideScreen() {
    this._loadScreen.next(false);
  }



}
