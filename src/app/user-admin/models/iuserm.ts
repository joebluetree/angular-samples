
export interface iUserm {
  user_id: number;
  user_code: string;
  user_name: string;
  user_password: string;
  user_email: string;
  user_is_admin: string;
  rec_company_id: number;
  rec_branch_id: number;
  rec_branch_name: string;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iUserm_Search {
  user_name: string;
  user_is_admin: string;
  rec_company_id: number;
}


