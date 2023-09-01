

export interface iUserBranches {
  ub_id: number;
  ub_user_id: number;
  ub_user_name: string;
  ub_selected: string;
  rec_company_id: number;
  rec_branch_id: number;
  rec_branch_name: string;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iUserBranches_Search {
  user_name: string;
  rec_company_id: number;
}
