import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url = "https:/jsonplaceholder.typicode.com";
  constructor() { }

  public getUrl(path: string = '') {
    let sep = path.startsWith("/") ? "" : "/";
    return this.url + sep + path;
  }
}
