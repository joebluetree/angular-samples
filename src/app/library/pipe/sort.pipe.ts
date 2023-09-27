import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableSort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], colname: string, direction: string = 'asc'): any[] {
    return value.sort(this.sortData(colname, direction));
  }
  sortData = (colname: string, direction: string = 'asc') => {
    return (a: any, b: any) => {
      if (colname == undefined)
        return 0;
      if (a[colname] < b[colname])
        return direction == 'asc' ? -1 : 1;
      if (a[colname] > b[colname])
        return direction == 'asc' ? 1 : -1;
      return 0;
    }
  }

}
