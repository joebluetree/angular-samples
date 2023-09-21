import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { iUser } from '../models/user';

import ShortUniqueId from 'short-unique-id';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url = "https:/jsonplaceholder.typicode.com";


  private _toast: Subject<string[]> = new Subject<string[]>();
  public readonly toast$ = this._toast.asObservable();


  public app_id = '';
  public user: iUser;

  constructor(private location: Location) {
    this.url = "https:/jsonplaceholder.typicode.com";
    this.url = "http://localhost:5153";
  }

  public getUrl(path: string = '') {
    let sep = path.startsWith("/") ? "" : "/";
    const _url = this.url + sep + path;
    return _url;
  }

  updateURL(param: any) {
    const qs = new URLSearchParams(location.search);
    for (var key in param) {
      qs.set(key, param[key]);
    }
    this.location.replaceState(location.pathname, qs.toString())
  }

  public IsValidToken(token: any) {
    const decodedToken = this.decodeToken(token);
    let bRet = true;
    if (Date.now() >= decodedToken.exp * 1000) {
      bRet = false;
    }
    return bRet;
  }

  public decodeToken(token: string) {

    const _decodeToken = (token: string) => {
      try {
        return JSON.parse(window.atob(token));
      } catch {
        return;
      }
    };

    return token
      .split('.')
      .map(token => _decodeToken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }

  //toast subject

  public showScreen(msg: string[]) {
    this._toast.next(msg);
  }
  public hideScreen() {
    this._toast.next([]);
  }

  public saveAuthState() {
    this.app_id = this.getShortUId();
    const token_name = this.getTokenName();
    localStorage.setItem(token_name, JSON.stringify(this.user));
  }

  public getTokenName() {
    if (this.app_id)
      return 'token-' + this.app_id;
    else
      return '';
  }

  public getToken() {
    if (this.user)
      return this.user.user_token;
    else
      return '';
  }

  public getGlobalConstants() {
    return {
      global_user_id: this.user.user_id,
      global_user_code: this.user.user_code,
      global_user_name: this.user.user_name,
      global_user_email: this.user.user_email,
      global_user_company_id: this.user.user_company_id,
      global_user_branch_id: this.user.user_branch_id,
    };
  }


  public readAuthState() {
    let bRet = false;
    const _app_id = this.getURLParam('appid');
    if (_app_id)
      this.app_id = _app_id;
    else
      return bRet;
    const token_name = this.getTokenName();
    if (localStorage.getItem(token_name)) {
      let user = JSON.parse(localStorage.getItem(token_name) || '{}');
      const _user: iUser = {
        user_id: user.user_id,
        user_code: user.user_code,
        user_name: user.user_name,
        user_email: user.user_email,
        user_token: user.user_token,
        user_company_id: user.user_company_id,
        user_branch_id: user.user_branch_id,
        user_password: '',
        user_menu_list: user.user_menu_list,
      }
      this.user = _user;
      bRet = true;
    }
    return bRet;
  }

  getURLParam(param: string) {
    return new URLSearchParams(window.location.search).get(param);
  }

  public getShortUId() {
    const uid = new ShortUniqueId();
    return uid();
  }


}
