import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iModulem } from '../models/imodulem';
import { GlobalService } from '../../core/services/global.service';

@Injectable({ providedIn: 'root' })
export class ModuleService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList() {
    return this.http.get<iModulem[]>(this.gs.getUrl('/api/module/GetListAsync'));
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
