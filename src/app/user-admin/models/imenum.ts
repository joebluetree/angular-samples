
export interface iMenum {
  menu_id: number;
  menu_module_id: number;
  menu_module_name: string;
  menu_code: string;
  menu_name: string;
  menu_route: string;
  menu_param: string;
  menu_visible: string;
  menu_order: number;
  rec_company_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iMenum_Search {
  menu_name: string;
  module_id: number;
  module_name: string;
  menu_visible: string;
  rec_company_id: number;
}


