import * as ac from '../models/icolumns';


export interface iclassMappings {
  [key: string]: any
}

export const classMapping: iclassMappings = {
  'modulem': ac.table_modulem,
  'userm': ac.table_userm,
  'branchm': ac.table_branchm,
};


