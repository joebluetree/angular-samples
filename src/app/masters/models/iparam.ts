import { EntitySelectors, EntityState } from "@ngrx/entity/src/models";
import { iPage } from "src/app/shared/models/ipage";

export interface iParam {
  param_id: number;
  param_type: string;
  param_code: string;
  param_name: string;
  param_order: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iParam_Search {
  param_code: string;
  param_name: string;

}


