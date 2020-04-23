import { createAction, props } from '@ngrx/store';

import { FunctionRule } from '../../models/function-rule.model';
import { FunctionObject } from '../../models/function.model';

export const addFunctionRule = createAction(
  '[FunctionRule] Add FunctionRule',
  props<{ functionRule: FunctionRule }>()
);

export const addFunctionRules = createAction(
  '[FunctionRule] Add FunctionRules',
  props<{ functionRules: FunctionRule[] }>()
);

export const updateFunctionRule = createAction(
  '[FunctionRule] Update FunctionRule',
  props<{ id: string; changes: Partial<FunctionRule> }>()
);
export const deleteFunctionRule = createAction(
  '[FunctionRule] Delete FunctionRule',
  props<{ id: string }>()
);

export const setActiveFunctionRule = createAction(
  '[FunctionRule] Set active FunctionRule',
  props<{ functionRuleId: string; functionObject: FunctionObject }>()
);

export const updateActiveFunctionRule = createAction(
  '[FunctionRule] Update active FunctionRule'
);
