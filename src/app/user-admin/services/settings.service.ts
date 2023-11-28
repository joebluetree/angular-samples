import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iSettings, iSettings_Search } from '../models/isettings';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'ngx-jrt-controls';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: any, search_record: iSettings_Search, page: iPage) {
    const data = { ...action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/settings/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iSettings>(this.gs.getUrl('api/settings/getRecordAsync'), options);
  }

  public save(id: number, record: iSettings) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iSettings>(this.gs.getUrl('/api/settings/SaveAsync'), record, options);

  }

  public ReUpdate(category: string, comp_id: number, branch_id: number, user_code: string) {

    const params = {
      'category': category,
      'company_id': comp_id,
      'branch_id': branch_id,
      'user_code': user_code
    }
    const options = {
      params: params
    }
    return this.http.post<iSettings>(this.gs.getUrl('/api/settings/ReUpdateAsync'), null, options);

  }


  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/settings/DeleteAsync'), options);
  }

}
