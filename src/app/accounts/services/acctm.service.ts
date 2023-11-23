import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iAcctm, iAcctm_Search } from '../models/iacctm';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'ngx-jrt-controls';

@Injectable({ providedIn: 'root' })
export class AcctmService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: any, search_record: iAcctm_Search, page: iPage) {
    const data = { ...action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/accounts/acctm/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iAcctm>(this.gs.getUrl('api/accounts/acctm/getRecordAsync'), options);
  }

  public save(id: number, record: iAcctm) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iAcctm>(this.gs.getUrl('/api/accounts/acctm/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/accounts/acctm/DeleteAsync'), options);
  }

}
