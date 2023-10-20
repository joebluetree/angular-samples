import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iAccGroupm, iAccGroupm_Search } from '../models/iaccgroupm';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'ngx-jrt-controls';

@Injectable({ providedIn: 'root' })
export class AccGroupService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iAccGroupm_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/accounts/accgroup/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iAccGroupm>(this.gs.getUrl('api/accounts/accgroup/getRecordAsync'), options);
  }

  public save(id: number, record: iAccGroupm) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iAccGroupm>(this.gs.getUrl('/api/accounts/accgroup/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/accounts/accgroup/DeleteAsync'), options);
  }

}
