import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core/services/global.service';
import * as ac from '../models/icolumns';

export interface iclassMappings {
  [key: string]: any
}

const classMapping: iclassMappings = {
  'modulem': ac.table_modulem,
  'userm': ac.table_userm,
};

@Injectable({ providedIn: 'root' })
export class CommonService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService) {
  }
  public getColumns(table: string) {
    let funName = new (classMapping[`${table}`]);
    const data = funName.getColumns();
    return data;
  }
  public getList(search_record: any) {
    return this.http.post<any>(this.gs.getUrl('/api/search/GetListAsync'), search_record);
  }

}

