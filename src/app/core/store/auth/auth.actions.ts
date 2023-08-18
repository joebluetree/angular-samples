import { createAction, props } from '@ngrx/store';
import { iUser } from '../../models/user';

//actions
export const auth_login = createAction(
  '[Auth] Login',
  props<{ code: string, password: string }>()
);

export const auth_branch_login = createAction(
  '[Auth] Branch Login',
  props<{ company_id: number, branch_id: number, user_id: number }>()
);

export const auth_login_success = createAction(
  '[Auth] Login Success',
  props<{ user: iUser }>()
);

export const auth_login_failure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const auth_logout = createAction('[Auth] Logout')


