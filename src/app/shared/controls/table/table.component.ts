
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { iTable } from '../../models/itable';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input('table') table_data: iTable[] = [];
  @Input('data') records: any[] = [];

  @Input('sort_column') sort_column = "";
  @Input('sort_order') sort_order = "";

  @Input('row_id_name') row_id_name = "";
  @Input('selected_id') selected_id = 0;



  @Output('callback_table') CallBack_Table = new EventEmitter<any>();

  menuid = '';
  title = '';
  type = '';

  sort_icon = '';

  constructor(
  ) {

  }

  ngOnInit(): void {

  }

  search(search_record: any) {
  }

  pageEvents(_action: any) {
  }

  selectRow(rec: any) {
    this.CallBack_Table.emit({ action: 'ROW-SELECTED', row_id: rec[this.row_id_name] })
  }

  deleteRow(rec: any) {
    if (!confirm(`Delete  y/n`))
      return;
  }

  getParam(rec: any, cols: iTable) {
    let qp: any = cols.qp;
    qp.id = rec[this.row_id_name];
    return qp;
  }

  sortHeader(col_name: string) {
    if (col_name == this.sort_column)
      this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
    else
      this.sort_order = 'asc';

    this.sort_icon = this.sort_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    this.CallBack_Table.emit({ action: 'SORT', sort_column: col_name, sort_icon: this.sort_icon, sort_order: this.sort_order })

  }

  public getIcon(col: string) {
    if (col == this.sort_column)
      return this.sort_icon;
    else
      return '';
  }

}
