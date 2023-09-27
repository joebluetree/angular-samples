export interface icolumns {
  id: string;
  value: string;
}


export interface table_constants {
  getColumns(): icolumns[]
}

export class table_modulem implements table_constants {
  public getColumns() {
    return [
      <icolumns>{ id: 'ID', value: 'module_id' },
      <icolumns>{ id: 'NAME', value: 'module_name' }
    ]
  }
}

export class table_userm implements table_constants {
  public getColumns() {
    return [
      <icolumns>{ id: 'ID', value: 'user_id' },
      <icolumns>{ id: 'NAME', value: 'user_name' }
    ]
  }
}

export class table_branchm implements table_constants {
  public getColumns() {
    return [
      <icolumns>{ id: 'ID', value: 'branch_id' },
      <icolumns>{ id: 'NAME', value: 'branch_name' }
    ]
  }
}
