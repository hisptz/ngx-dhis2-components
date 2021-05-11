import { createAction, props } from '@ngrx/store';

import { DataElementGroup } from '../../models/data-element-group.model';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';

export const loadDataElementGroups = createAction(
  '[DataElementGroup] Load Data Elements'
);

export const loadDataElementGroupsInitiated = createAction(
  '[DataElementGroup] Load DataElementGroups initiate'
);

export const loadDataElementGroupsFail = createAction(
  '[DataElementGroup] Load DataElementGroups fail',
  props<{ error: ErrorMessage }>()
);

export const addDataElementGroup = createAction(
  '[DataElementGroup] Add DataElementGroup',
  props<{ dataElementGroup: DataElementGroup }>()
);

export const addDataElementGroups = createAction(
  '[DataElementGroup] Add DataElementGroups',
  props<{ dataElementGroups: DataElementGroup[] }>()
);

export const updateDataElementGroup = createAction(
  '[DataElementGroup] Update DataElementGroup',
  props<{ id: string; changes: Partial<DataElementGroup> }>()
);

export const deleteDataElementGroup = createAction(
  '[DataElementGroup] Delete DataElementGroup',
  props<{ id: string }>()
);
