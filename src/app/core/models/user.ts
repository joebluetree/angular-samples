import { iMenum } from "src/app/user-admin/models/imenum";

export interface iUser {
  user_id: number;
  user_code: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_token: string;
  user_company_id: number;
  user_branch_id: number;
  user_menu_list: iMenum[];
}
