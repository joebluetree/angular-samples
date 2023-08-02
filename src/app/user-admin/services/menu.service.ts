import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iMenum, iMenum_Search } from '../models/imenum';
import { GlobalService } from '../../core/services/global.service';
import { iPage } from 'src/app/shared/models/ipage';

@Injectable({ providedIn: 'root' })
export class MenueService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(action: string, search_record: iMenum_Search, page: iPage) {
    const data = { 'action': action, ...search_record, ...page }
    return this.http.post<any>(this.gs.getUrl('/api/menu/GetListAsync'), data);
  }

  public getRecord(id: number) {
    const param = new HttpParams()
      .set('id', id)
    const options = {
      params: param
    }
    return this.http.get<iMenum>(this.gs.getUrl('api/menu/getRecordAsync'), options);
  }

  public save(id: number, record: iMenum) {

    const params = {
      'id': id
    }
    const options = {
      params: params
    }
    return this.http.post<iMenum>(this.gs.getUrl('/api/menu/SaveAsync'), record, options);

  }

  public delete(_id: number) {
    const params = {
      'id': _id
    }
    const options = {
      params: params
    }
    return this.http.get<any>(this.gs.getUrl('api/menu/DeleteAsync'), options);
  }

}
