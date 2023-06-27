export function getIcon(col: string, sorted_col: string, sorted_order: string) {
  if (col == sorted_col)
    return sorted_order == 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
  else
    return '';
}
