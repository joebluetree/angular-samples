import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iModulem } from '../models/imodulem';

@Injectable({ providedIn: 'root' })
export class ModuleService {

  constructor(private http: HttpClient) {
  }

  public getList() {
    return this.http.get<iModulem[]>('api/module/getList');
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iModulem>('api/module/getRecord', options);
  }

}
