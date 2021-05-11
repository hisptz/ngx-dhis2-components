import { createAction, props } from '@ngrx/store';

import { DataElement } from '../../models/data-element.model';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';

export const loadDataElements = createAction(
  '[DataElement] Load Data Elements'
);

export const loadDataElementsInitiated = createAction(
  '[DataElement] Load DataElements initiate'
);

export const loadDataElementsFail = createAction(
  '[DataElement] Load DataElements fail',
  props<{ error: ErrorMessage }>()
);

export const addDataElement = createAction(
  '[DataElement] Add DataElement',
  props<{ dataElement: DataElement }>()
);

export const addDataElements = createAction(
  '[DataElement] Add DataElements',
  props<{ dataElements: DataElement[] }>()
);

export const updateDataElement = createAction(
  '[DataElement] Update DataElement',
  props<{ id: string; changes: Partial<DataElement> }>()
);

export const deleteDataElement = createAction(
  '[DataElement] Delete DataElement',
  props<{ id: string }>()
);
