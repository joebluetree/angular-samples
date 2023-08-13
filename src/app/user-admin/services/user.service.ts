import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iUserm, iUserm_Search } from '../models/iuserm';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'src/app/shared/models/ipage';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iUserm_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/user/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iUserm>(this.gs.getUrl('api/user/getRecordAsync'), options);
  }

  public save(id: number, record: iUserm) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iUserm>(this.gs.getUrl('/api/user/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/user/DeleteAsync'), options);
  }

}
