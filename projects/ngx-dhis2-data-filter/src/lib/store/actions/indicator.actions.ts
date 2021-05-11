import { createAction, props } from '@ngrx/store';

import { Indicator } from '../../models/indicator.model';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';

export const loadIndicators = createAction('[Indicator] Load Indicators');

export const loadIndicatorsInitiated = createAction(
  '[Indicator] Load Indicators initiate'
);

export const loadIndicatorsFail = createAction(
  '[Indicator] Load Indicators fail',
  props<{ error: ErrorMessage }>()
);

export const addIndicator = createAction(
  '[Indicator] Add Indicator',
  props<{ indicator: Indicator }>()
);

export const addIndicators = createAction(
  '[Indicator] Add Indicators',
  props<{ indicators: Indicator[] }>()
);

export const updateIndicator = createAction(
  '[Indicator] Update Indicator',
  props<{ id: string; changes: Partial<Indicator> }>()
);

export const deleteIndicator = createAction(
  '[Indicator] Delete Indicator',
  props<{ id: string }>()
);
