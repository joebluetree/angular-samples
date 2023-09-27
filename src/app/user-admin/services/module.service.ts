import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iModulem, iModulem_Search } from '../models/imodulem';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'ngx-jrt-controls';

@Injectable({ providedIn: 'root' })
export class ModuleService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iModulem_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/module/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iModulem>(this.gs.getUrl('api/module/getRecordAsync'), options);
  }

  public save(id: number, record: iModulem) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iModulem>(this.gs.getUrl('/api/module/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/module/DeleteAsync'), options);
  }

}
