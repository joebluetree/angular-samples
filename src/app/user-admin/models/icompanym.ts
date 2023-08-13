
export interface iCompanym {
  comp_id: number;
  comp_code: string;
  comp_name: string;
  comp_address1: string;
  comp_address2: string;
  comp_address3: string;


  rec_company_id: number;
  rec_branch_id: number;
  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iCompanym_Search {
  comp_name: string;
  rec_company_id: number;
}


