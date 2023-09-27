import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iCompanym, iCompanym_Search } from '../models/icompanym';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from '../../library/models/ipage';

@Injectable({ providedIn: 'root' })
export class CompanyService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iCompanym_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/company/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iCompanym>(this.gs.getUrl('api/company/getRecordAsync'), options);
  }

  public save(id: number, record: iCompanym) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iCompanym>(this.gs.getUrl('/api/company/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/company/DeleteAsync'), options);
  }

}
