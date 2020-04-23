import { createSelector } from '@ngrx/store';

import {
  getDataFilterState,
  DataFilterState
} from '../reducers/data-filter.reducer';
import { adapter, FunctionRuleState } from '../reducers/function-rule.reducer';

export const getFunctionRuleState = createSelector(
  getDataFilterState,
  (state: DataFilterState) => state.functionRule
);

export const {
  selectEntities: getFunctionRuleEntities,
  selectAll: getAllFunctionRules
} = adapter.getSelectors(getFunctionRuleState);

export const getActiveFunctionRuleId = createSelector(
  getFunctionRuleState,
  (functionRuleState: FunctionRuleState) =>
    functionRuleState.activeFunctionRuleId
);

export const getActiveFunctionRule = createSelector(
  getFunctionRuleEntities,
  getActiveFunctionRuleId,
  (functionRuleEntities: any, activeFunctionRuleId: string) =>
    functionRuleEntities[activeFunctionRuleId]
);

export const getFunctionRuleById = functionRuleId =>
  createSelector(
    getFunctionRuleEntities,
    (functionRuleEntities: any) => functionRuleEntities[functionRuleId]
  );
