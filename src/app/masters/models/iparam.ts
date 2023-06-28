import { iPage } from "src/app/shared/models/ipage";

export interface iParam {
  param_id: number;
  param_type: string;
  param_code: string;
  param_name: string;
  param_order: number;
}

export interface iParam_Search {
  param_code: string;
  param_name: string;
}


