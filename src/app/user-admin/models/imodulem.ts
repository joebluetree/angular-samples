import { iPage } from "src/app/shared/models/ipage";

export interface iModulem {
  module_id: number;
  module_name: string;
  module_is_installed: string;
  module_order: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
}

export interface iModulem_Search {
  module_name: string;
  module_is_installed: string;
}


