import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core/services/global.service';


@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(search_record: any) {
    return this.http.post<any>(this.gs.getUrl('/api/search/GetListAsync'), search_record);
  }


}
