import { ErrorMessage, User } from '@iapps/ngx-dhis2-http-client';
import { createAction, props } from '@ngrx/store';

import { FunctionRule } from '../../models/function-rule.model';
import { FunctionObject } from '../../models/function.model';

export const loadFunctionsInitialized = createAction(
  '[Function] Load Functions initiated'
);

export const loadFunctions = createAction(
  '[Function] Load Functions',
  props<{ currentUser: User; routeParams?: any }>()
);

export const loadFunctionsFail = createAction(
  '[Function] Load Functions fail',
  props<{ error: ErrorMessage }>()
);

export const addFunction = createAction(
  '[Function] Add Function',
  props<{ functionObject: FunctionObject }>()
);

export const addFunctions = createAction(
  '[Function] Add Functions',
  props<{ functions: FunctionObject[]; functionRules: FunctionRule[] }>()
);

export const updateFunction = createAction(
  '[Function] Update Function',
  props<{ id: string; changes: Partial<FunctionObject> }>()
);

export const deleteFunction = createAction(
  '[Function] Delete Function',
  props<{ id: string }>()
);

export const deleteFunctions = createAction(
  '[Function] Delete Functions',
  props<{ ids: string[] }>()
);

export const saveFunction = createAction(
  '[Function] Save Function',
  props<{ functionObject: FunctionObject; currentUser: User }>()
);

export const saveFunctionSuccess = createAction(
  '[Function] Save Function success',
  props<{ functionObject: FunctionObject }>()
);

export const saveFunctionFails = createAction(
  '[Function] Save Function fail',
  props<{ functionObject: FunctionObject; error: ErrorMessage }>()
);

export const setActiveFunction = createAction(
  '[Function] Set active Function',
  props<{ functionObject: FunctionObject }>()
);

export const updateActiveFunction = createAction(
  '[Function] Update active Function'
);
