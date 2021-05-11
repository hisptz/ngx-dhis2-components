import { createAction, props } from '@ngrx/store';

import { IndicatorGroup } from '../../models/indicator-group.model';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';

export const loadIndicatorGroups = createAction(
  '[IndicatorGroup] Load IndicatorGroups'
);

export const loadIndicatorGroupsInitiated = createAction(
  '[IndicatorGroup] Load IndicatorGroups initiate'
);

export const loadIndicatorGroupsFail = createAction(
  '[IndicatorGroup] Load IndicatorGroups fail',
  props<{ error: ErrorMessage }>()
);

export const addIndicatorGroup = createAction(
  '[IndicatorGroup] Add IndicatorGroup',
  props<{ indicatorGroup: IndicatorGroup }>()
);

export const addIndicatorGroups = createAction(
  '[IndicatorGroup] Add IndicatorGroups',
  props<{ indicatorGroups: IndicatorGroup[] }>()
);

export const updateIndicatorGroup = createAction(
  '[IndicatorGroup] Update IndicatorGroup',
  props<{ id: string; changes: Partial<IndicatorGroup> }>()
);

export const deleteIndicatorGroup = createAction(
  '[IndicatorGroup] Delete IndicatorGroup',
  props<{ id: string }>()
);
