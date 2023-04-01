import { iPage } from "src/app/shared/models/ipage";

export interface iModulem {
  module_id: number;
  module_name: string;
  module_is_installed: string;
  module_order: number;
}

export interface iModulem_Search {
  module_name: string;
  module_is_installed: string;
}


