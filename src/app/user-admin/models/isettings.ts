export interface iSettings {
  id: number;
  category: string;
  caption: string;
  remarks: string;
  type: string;
  table: string;
  value: string;
  order: number;

  rec_company_id: number;
  rec_branch_id: number;

  rec_created_by: string;
  rec_created_date: string;
  rec_edited_by: string;
  rec_edited_date: string;
}

export interface iSettings_Search {
  caption: string;
  rec_company_id: number;
}

