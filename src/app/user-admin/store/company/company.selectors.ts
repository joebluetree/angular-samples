import { createSelector } from '@ngrx/store';
import { CompanyState, companyFeature, selectAll } from './company.reducer';

export const selectCompany = createSelector(
  companyFeature,
  selectAll
)

export const selectCompanyState = createSelector(
  companyFeature,
  (state: CompanyState) => state
)

export const selectCompanySearch_Record = createSelector(
  companyFeature,
  (a) => a.search_record
)

export const selectCompanyPage = createSelector(
  companyFeature,
  (a) => a.page
)

export const selectCompanyPage_RowId = createSelector(
  companyFeature,
  (a) => a.selectid
)

export const selectCompanyPage_SortColumn = createSelector(
  companyFeature,
  (a) => a.sort_column
)

export const selectCompanyPage_SortOrder = createSelector(
  companyFeature,
  (a) => a.sort_order
)
