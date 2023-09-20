
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

  rights_selected: number;
  rights_company: number;
  rights_admin: number;
  rights_add: number;
  rights_edit: number;
  rights_delete: number;
  rights_view: number;
  rights_print: number;
  rights_doc_upload: number;
  rights_doc_view: number;
  rights_approver: number;
  rights_value: number;


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


