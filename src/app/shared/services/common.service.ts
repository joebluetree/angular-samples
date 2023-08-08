import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core/services/global.service';
import { icolumns } from '../models/icolumns';


@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }

  public getList(search_record: any) {
    return this.http.post<any>(this.gs.getUrl('/api/search/GetListAsync'), search_record);
  }

  public getColumns(table: string): any[] {
    if (table == 'modulem')
      return this.getModulem();
    return [];
  }

  private getModulem() {
    return [
      <icolumns>{ id: 'ID', value: 'module_id' },
      <icolumns>{ id: 'NAME', value: 'module_name' }
    ]
  }

}

