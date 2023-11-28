import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { iSettings, iSettings_Search } from '../../models/isettings';
import * as allActions from './settings.actions';
import { iPage } from 'ngx-jrt-controls';

export interface SettingsState extends EntityState<iSettings> {
  selectid: number;
  category: string;
  search_record: iSettings_Search;
  page: iPage;
  sort_column: string;
  sort_order: string;
  error: string;
};

const adapter: EntityAdapter<iSettings> = createEntityAdapter<iSettings>({
  selectId: (m) => m.id
});

export const initialSettingsState: SettingsState = adapter.getInitialState({
  selectid: 0,
  category: '',
  search_record: <iSettings_Search>{ caption: '', rec_company_id: 0 },
  page: <iPage>{ currentPageNo: 1, pages: 0, pageSize: 10, rows: 0 },
  sort_column: '',
  sort_order: '',
  error: ''
});

export interface SettingsGroupState {
  [params: string]: SettingsState
}

export const InitialSettingsGroupState: SettingsGroupState = {
  'DEFAULT': initialSettingsState,
  'COMPANY-SETTINGS': initialSettingsState,
  'BRANCH-SETTINGS': initialSettingsState,
}


export const Reducer = createReducer<SettingsGroupState>(
  InitialSettingsGroupState,
  on(allActions.load_success, (state, action) => {

    return {
      ...state,
      [action.category]: adapter.setAll(action.records, { ...state[action.category], page: action.page, error: '' })
    }
  }),
  /*
  on(allActions.load_failure, (state, action) => {
    return adapter.removeAll({ ...state, error: action.erorr })
  }),
  */
  on(allActions.update_selected_rowid, (state, action) => {
    return { ...state, [action.category]: { ...state[action.category], selectid: action.id } };
  }),
  on(allActions.update_search, (state, action) => {
    return { ...state, [action.category]: { ...state[action.category], search_record: action.search_record } };
  }),
  on(allActions.upsert_row, (state, action) => {
    return {
      ...state,
      [action.category]: adapter.upsertOne(action.record, state[action.category])
    }
  }),
  on(allActions.delete_complete, (state, action) => {
    return {
      ...state,
      [action.category]: adapter.removeOne(action.id, state[action.category])
    }
  }),
  on(allActions.sort_records, (state, action) => {
    return {
      ...state,
      [action.category]: { ...state[action.category], sort_column: action.sort_column, sort_order: action.sort_order }
    }
  })

)

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const FeatureName = 'settingsGroupState';
export const Feature = createFeatureSelector<SettingsGroupState>(FeatureName);


