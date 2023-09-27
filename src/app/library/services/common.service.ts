import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { classMapping } from '../models/iclassmappings';

@Injectable({ providedIn: 'root' })
export class CommonService {

  public url = "";

  constructor(
    private http: HttpClient,
  ) {
  }

  public getUrl(path: string = '') {
    let sep = path.startsWith("/") ? "" : "/";
    const _url = this.url + sep + path;
    return _url;
  }

  public getColumns(table: string) {
    let funName = new (classMapping[`${table}`]);
    const data = funName.getColumns();
    return data;
  }

  public getList(_url: string, search_record: any) {
    this.url = _url;
    return this.http.post<any>(this.getUrl('/api/search/GetListAsync'), search_record);
  }

}

