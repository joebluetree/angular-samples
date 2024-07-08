import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iCustomerm, iCustomerm_Search } from '../models/icustomerm';
import { GlobalService } from '../../core/services/global.service';


@Injectable({ providedIn: 'root' })
export class CustomermService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: any, search_record: iCustomerm_Search, page: any) {
    const data = { ...action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/customer/GetListAsync'), data);
  }

  public getRecord(id: number) {

    const param = new HttpParams()
      .set('id', id)

    const options = {
      params: param
    }

    return this.http.get<iCustomerm>(this.gs.getUrl('api/customer/getRecordAsync'), options);
  }

  public save(id: number, record: iCustomerm) {

    const params = {
      'mode': id == 0 ? "add" : "edit"
    }

    const options = {
      params: params
    }

    return this.http.post<iCustomerm>(this.gs.getUrl('/api/customer/SaveAsync'), record, options);

  }

  public delete(_id: number) {

    const params = {
      'id': _id
    }

    const options = {
      params: params
    }

    return this.http.get<any>(this.gs.getUrl('api/customer/DeleteAsync'), options);

  }

}
