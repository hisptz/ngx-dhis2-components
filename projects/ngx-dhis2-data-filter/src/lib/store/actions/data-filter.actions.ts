import { User } from '@iapps/ngx-dhis2-http-client';
import { createAction, props } from '@ngrx/store';

export const loadDataFilters = createAction(
  '[DataFilter] Load DataFilters',
  props<{ currentUser: User }>()
);

export const updateActiveDataFilterSelections = createAction(
  '[DataFilter] Update active data filter selections',
  props<{ dataFilterSelections: any[] }>()
);

export const setCurrentDataFilterGroup = createAction(
  '[DataFilter] Set current data filter group',
  props<{ currentDataFilterGroupId: string }>()
);
