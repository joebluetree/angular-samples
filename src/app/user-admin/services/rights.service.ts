import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iUserBranches, iUserBranches_Search } from '../models/iuserbranches';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'src/app/shared/models/ipage';

@Injectable({ providedIn: 'root' })
export class RightsService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iUserBranches_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    const url = this.gs.getUrl('/api/rights/GetListAsync');
    return this.http.post<any>(url, data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iUserBranches>(this.gs.getUrl('api/rights/getRecordAsync'), options);
  }

  public save(id: number, record: iUserBranches) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iUserBranches>(this.gs.getUrl('/api/rights/SaveAsync'), record, options);

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
