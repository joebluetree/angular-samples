import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iParam, iParam_Search } from '../models/iparam';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'src/app/shared/models/ipage';

@Injectable({ providedIn: 'root' })
export class ParamService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: any, search_record: iParam_Search, page: iPage) {
    const data = { ...action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/param/GetListAsync'), data);
  }

  public getRecord(id: number) {

    const param = new HttpParams()
      .set('id', id)

    const options = {
      params: param
    }

    return this.http.get<iParam>(this.gs.getUrl('api/param/getRecordAsync'), options);
  }

  public save(id: number, record: iParam) {

    const params = {
      'id': id
    }

    const options = {
      params: params
    }

    return this.http.post<iParam>(this.gs.getUrl('/api/param/SaveAsync'), record, options);

  }

  public delete(_id: number) {

    const params = {
      'id': _id
    }

    const options = {
      params: params
    }

    return this.http.get<any>(this.gs.getUrl('api/param/DeleteAsync'), options);

  }

}
