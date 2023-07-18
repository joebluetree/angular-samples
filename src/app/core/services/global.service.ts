import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { iUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url = "https:/jsonplaceholder.typicode.com";


  private _toast: Subject<string[]> = new Subject<string[]>();
  public readonly toast$ = this._toast.asObservable();


  public user: iUser;

  constructor(private location: Location) {
    this.url = "https:/jsonplaceholder.typicode.com";
    this.url = "http://localhost:5153";
  }

  public getUrl(path: string = '') {
    let sep = path.startsWith("/") ? "" : "/";
    return this.url + sep + path;
  }

  updateURL(param: any) {
    const qs = new URLSearchParams(location.search);
    for (var key in param) {
      qs.set(key, param[key]);
    }
    this.location.replaceState(location.pathname, qs.toString())
  }

  public IsValidToken(token: any) {
    const decodedToken = this.decodeToken(token.user_token);
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


}
