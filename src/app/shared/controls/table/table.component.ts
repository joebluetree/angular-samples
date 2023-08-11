import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iTable } from '../../models/itable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input('table') table_data: iTable[] = [];
  @Input('data') records: any;
  @Input('selected_id') selected_id: any;
  @Input('sort_column') sort_column: any;
  @Input('sort_order') sort_order: any;
  @Input('row_id_name') row_id_name = "";
  @Output('callback_table') CallBack_Table = new EventEmitter<any>();

  constructor(
  ) {
  }
  selectRow(rec: any) {
    this.CallBack_Table.emit({ action: 'ROW-SELECTED', row_id: rec[this.row_id_name] })
  }

  deleteRow(rec: any) {
    this.CallBack_Table.emit({ action: 'DELETE', rec: rec })
  }

  getParam = (rec: any, cols: iTable) => {
    return { ...cols.param, 'id': rec[this.row_id_name] };
  }

  sortHeader(col_name: string) {
    if (col_name == this.sort_column)
      this.sort_order = this.sort_order == 'asc' ? 'desc' : 'asc';
    else
      this.sort_order = 'asc';
    this.CallBack_Table.emit({ action: 'SORT', sort_column: col_name, sort_order: this.sort_order })
  }

  public getIcon(col: string) {
    if (col == this.sort_column)
      return this.sort_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
    else
      return '';
  }

}
