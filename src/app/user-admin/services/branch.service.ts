import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iBranchm, iBranchm_Search } from '../models/ibranchm';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from '../../library/models/ipage';

@Injectable({ providedIn: 'root' })
export class BranchService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iBranchm_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/branch/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iBranchm>(this.gs.getUrl('api/branch/getRecordAsync'), options);
  }

  public save(id: number, record: iBranchm) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iBranchm>(this.gs.getUrl('/api/branch/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/branch/DeleteAsync'), options);
  }

}
